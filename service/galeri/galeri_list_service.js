import iHttpRequest from "../../app/ihttprequest";
import IJson from "../../app/ijson";
import ReturnModel from "../../app/returnmodel";
import AppConfig from "../../app/appconfig";

export default class galeri_list_service
{
    
    constructor()
    {
        this.ih = new iHttpRequest();
        this.KataKunci = "";
        this.TotalPage = 0;
        this.TotalData = 0;
    }
    
    async requestData(pageNumber)
    {
        var result = new ReturnModel();

        var ijson = new IJson();
        ijson.newTable("DataHeader");
        ijson.addRow("katakunci", this.KataKunci);
        ijson.addRow("page", pageNumber);
        ijson.endRow();
        ijson.createTable();

        this.ih.setFormData();

        var token = "";
        var postdata = ijson.generateJson();
        var res = await this.ih.sendData(AppConfig.APP_URL, "galeri/list", token, postdata);

        // console.log(postdata);
        // console.log(res);

        var resdata = IJson.parse(res);
        if(resdata.status == false)
        {
            result.Message = "Data yang diterima bermasalah [res data], " + resdata.pesan;
            result.Number = 1;
            return result;
        }

        var rows = IJson.jsontodata(res, 'DataGaleri');
        if (rows == null)
        {
            result.Number = 1;
            result.Message = "Data yang diterima bermasalah [DataGaleri], " + resdata.pesan;
            return;
        }

        var DataPaging = IJson.jsontodata(res, 'DataPaging');
        if (DataPaging == null)
        {
            result.Number = 2;
            result.Message = "Data yang diterima bermasalah [DataPaging]";
            return result;
        }

        this.TotalPage = DataPaging.totalpage;
        this.TotalData = DataPaging.totaldata;

        result.Number = 0;
        result.Data = rows;
        return result;
    }

    async deleteData(kode)
    {
        var ijson = new IJson();
        ijson.newTable("DataHeader");
        ijson.addRow("kode", kode);
        ijson.endRow();

        ijson.createTable();
        var token = "";
        var postdata = ijson.generateJson();
        var res = await this.ih.sendData(AppConfig.APP_URL, "galeri/delete", token, postdata);

        var retres = IJson.parse(res);
        var result = new ReturnModel();

        if(retres.status == false)
        {
            result.Number = 2;
            result.Message = retres.pesan;
            return result;
        }

        result.Number = 0;
        result.Message = retres.pesan;
        return result;

    }
}
