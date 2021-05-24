import AppConfig from "../app/appconfig";
import SQLite from "react-native-sqlite-2";

export default class Session
{
    constructor()
    {

    }

    async cekSessionIsLogin()
    {
        var iRes = false;
        var usertoken = "";
        const dbs = SQLite.openDatabase(AppConfig.DB_NAME, "1.0", "", 1);
        await dbs.transaction(function (txn) {
            txn.executeSql("SELECT * FROM `tbl_session`", [], function (tx, res) {
                for (let i = 0; i < res.rows.length; ++i) {
                    var row = res.rows.item(i);
                    usertoken = row.usertoken;
                    // console.log("item:", usertoken);
                }
            });
        });

        console.log(usertoken);
    }

    clearSession()
    {
        const dbs = SQLite.openDatabase(AppConfig.DB_NAME, "1.0", "", 1);
        dbs.transaction(function (txn) {
            txn.executeSql("DROP TABLE IF EXISTS tbl_session", []);
            txn.executeSql(
                "CREATE TABLE IF NOT EXISTS tbl_session(" +
                    " kodeid INTEGER PRIMARY KEY NOT NULL, " +
                    " username VARCHAR(30), " +
                    " usertoken TEXT, " +
                    " nama VARCHAR(30) " +
                ")",
                []
            );
        });
    }

    // send data dengan file
    saveSession(row)
    {
        const dbs = SQLite.openDatabase(AppConfig.DB_NAME, "1.0", "", 1);
        dbs.transaction(function (txn) {
            txn.executeSql("INSERT INTO tbl_session (username, usertoken, nama) VALUES (:username, :usertoken, :nama)", [row.username, row.usertoken, row.nama]);
            txn.executeSql("SELECT * FROM `tbl_session`", [], function (tx, res) {
                for (let i = 0; i < res.rows.length; ++i) {
                    console.log("item:", res.rows.item(i));
                }
            });
        });
    }

}
