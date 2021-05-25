import AppConfig from "../app/appconfig";
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(false);
SQLite.enablePromise(true);
// import SQLite from "react-native-sqlite-2";

export default class Session
{
    dbs = null;

    constructor()
    {
        this.dbs = SQLite.openDatabase(AppConfig.APP_DB_NAME, "1.0", "", 1);
    }

    async cekSessionIsLogin()
    {
        var jumlah = 0;

        return new Promise((resolve, reject) => this.dbs.transaction((tx) => {
            tx.executeSql("SELECT COUNT(*) as jumlah FROM `tbl_session`", [], (tx, results) => {
                console.log(results.rows.item(0).jumlah);
                jumlah = results.rows.item(0).jumlah;
                resolve(jumlah);
            }, function (tx, error) {
                reject(error);
            });
        }))

        // const dbs = SQLite.openDatabase(AppConfig.APP_DB_NAME, "1.0", "", 1);
        // await this.dbs.transaction(function (txn) {

        //     // txn.executeSql("SELECT * FROM `tbl_session`", [], (tx, res) => {
        //     //     // console.log(results.rows.item(0).product_count)
        //     //     // this.totalItems = results.rows.item(0).product_count;
        //     //     // callback(this.totalItems)
        //     //     var row = res.rows.item(0);
        //     //     usertoken = row.usertoken;
        //     //     callback(usertoken)
                
        //     // }, function (txn, error) {
        //     //     console.log('SELECT error: ' + error.message);
        //     // });

        //     // txn.executeSql("SELECT * FROM `tbl_session`", [], function (tx, res) {
        //     //     for (let i = 0; i < res.rows.length; ++i) {
        //     //         var row = res.rows.item(i);
        //     //         usertoken = row.usertoken;
        //     //         console.log("item:", usertoken);

        //     //         if(usertoken == "" || usertoken == null)
        //     //             iRes = false;
        //     //         else
        //     //             iRes = true;
                    
        //     //         return iRes;
        //     //     }
        //     // });

        //     return new Promise((resolve, reject) => db.transaction((tx) => {
        //         tx.executeSql("SELECT * FROM `tbl_session`", [], (tx, results) => {
        //             console.log(results.rows.item(0).usertoken)
        //             this.totalItems = results.rows.item(0).usertoken;
        //             resolve(this.totalItems);
        //         }, function (tx, error) {
        //             reject(error);
        //         });
        //     }))
        // });
    }

    clearSession()
    {
        // const dbs = SQLite.openDatabase(AppConfig.APP_DB_NAME, "1.0", "", 1);
        this.dbs.transaction(function (txn) {
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
        // const dbs = SQLite.openDatabase(AppConfig.APP_DB_NAME, "1.0", "", 1);
        this.dbs.transaction(function (txn) {
            txn.executeSql("INSERT INTO tbl_session (username, usertoken, nama) VALUES (:username, :usertoken, :nama)", [row.username, row.usertoken, row.nama]);
            txn.executeSql("SELECT * FROM `tbl_session`", [], function (tx, res) {
                for (let i = 0; i < res.rows.length; ++i) {
                    console.log("item:", res.rows.item(i));
                }
            });
        });
    }

}
