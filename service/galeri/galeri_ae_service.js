// config, class, function
import iHttpRequest from "../../app/ihttprequest";
import IJson from "../../app/ijson";
import ReturnModel from "../../app/returnmodel";
import AppConfig from "../../app/appconfig";
import StringFunction from "../../app/stringfunction";

export default class galeri_ae_service
{
    ID = "";
    SAVE_MODE = "";
    ACT_URL = "";

    DataHeader = "";

    constructor()
    {
        this.ih = new iHttpRequest();
        this.stringfunction = new StringFunction();
        // this.appsession = new AppSession();

        this.ACT_URL = "";
    }

    async setModeAct(id)
    {
        if(id == "" || id == null)
        {
            this.ACT_URL = "galeri/tambah";
            this.SAVE_MODE == AppConfig.SAVE_MODE_ADD;
        }
        else
        {
            this.ID = id;
            this.ACT_URL = "galeri/update";
            this.SAVE_MODE == AppConfig.SAVE_MODE_EDIT;
        }
    }

    async readData()
    {
        var ijson = new IJson();
        ijson.newTable("DataHeader");
        ijson.addRow("id", this.ID);
        ijson.endRow();
        ijson.createTable();

        this.ih.setFormData();

        var token = "";
        var postdata = ijson.generateJson();
        var res = await this.ih.sendData(AppConfig.APP_URL, "galeri/read", token, postdata);
        var result = new ReturnModel();

        console.log(res);

        var rows = IJson.jsontodata(res, 'DataGaleri');
        if (rows == null)
        {
            result.Number = 2;
            result.Message = "Data yang diterima bermasalah";
            return result;
        }

        result.Number = 0;
        result.Data = rows;
        return result;
    }

    async saveData()
    {
        var result = new ReturnModel();

        if(this.stringfunction.isEmptyOrNull(this.DataHeader.judulgaleri))
        {
            result.Number = 2;
            result.Message = "[judulgaleri] masih kosong..";
            return result;
        }

        console.log(this.ACT_URL);

        var ijson = new IJson();
        ijson.newTable("DataHeader");
        ijson.addRowFromObject(this.DataHeader);
        ijson.createTable();

        this.ih.setFormData();

        // jika ada gambar
        if(this.DataHeader.gambargaleri != "")
            this.ih.addImage("gambargaleri", this.DataHeader.gambargaleri);


        var token = "";
        var postdata = ijson.generateJson();
        var resdata = await this.ih.sendData(AppConfig.APP_URL, this.ACT_URL, token, postdata);
        var result = new ReturnModel();

        console.log(resdata);
        resdata = IJson.parse(resdata);

        if(resdata.status == false)
        {
            result.Number = 2;
            result.Message = "Data yang diterima bermasalah, " + resdata.pesan;
            return result;
        }

        // this.ID = resdata.kodereturn;

        result.Number = 0;
        result.Message = resdata.pesan;
        return result;

    }

}
