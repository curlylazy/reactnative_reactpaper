import iHttpRequest from "../../app/ihttprequest";
import IJson from "../../app/ijson";
import ReturnModel from "../../app/returnmodel";
import AppConfig from "../../app/appconfig";

export default class user_list_service
{
    
    constructor()
    {
        this.KataKunci = "";
        this.ih = new iHttpRequest();
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
        var res = await this.ih.sendData(AppConfig.APP_URL, "user/list", token, postdata);

        // console.log(postdata);
        // console.log(res);

        var resdata = IJson.parse(res);
        if(resdata.status == false)
        {
            result.Message = "Data yang diterima bermasalah [res data], " + resdata.pesan;
            result.Number = 1;
            return result;
        }

        var rows = IJson.jsontodata(res, 'DataUser');
        if (rows == null)
        {
            result.Message = "Data yang diterima bermasalah [DataUser], " + resdata.pesan;
            result.Number = 1;
            return;
        }

        result.Number = 0;
        result.Data = rows;
        return result;
    }

}
