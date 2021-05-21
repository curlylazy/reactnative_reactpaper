// config, class, function
import iHttpRequest from "../../app/ihttprequest";
import IJson from "../../app/ijson";
import ReturnModel from "../../app/returnmodel";
import AppConfig from "../../app/appconfig";
import StringFunction from "../../app/stringfunction";

export default class LoginService
{
    ID = "";
    SAVE_MODE = "";
    ACT_URL = "";

    DataHeader = "";
    Username = "";
    Password = "";

    constructor()
    {
        this.ih = new iHttpRequest();
        this.stringfunction = new StringFunction();
        // this.appsession = new AppSession();

        this.ACT_URL = "";
    }

    async cekLogin()
    {
        var ijson = new IJson();
        ijson.newTable("DataHeader");
        ijson.addRow("username", this.Username);
        ijson.addRow("password", this.Password);
        ijson.endRow();
        ijson.createTable();

        this.ih.setFormData();

        var token = "";
        var postdata = ijson.generateJson();
        var res = await this.ih.sendData(AppConfig.APP_URL, "user/login", token, postdata);
        var result = new ReturnModel();

        console.log(res);

        var rows = IJson.jsontodata(res, 'DataUser');
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

}
