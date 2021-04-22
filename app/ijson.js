export default class IJson
{
    constructor(){
        this.name = "";
        this.tablesArr = {};
        this.rowArr = {};
        this.rowArrs = [];
    }
    
    newTable(tablename)
    {
        this.name = tablename;
        this.rowArrs = [];
    }

    addRow(rowname, value)
    {
        this.rowArr[rowname] = value;
    }

    endRow()
    {
        this.rowArrs.push(this.rowArr);
        this.rowArr = {};
    }

    addRowFromObject(obj)
    {
        this.rowArrs.push(obj);
        this.rowArr = {};
    }

    createTableFromObjectCollection(tablename, obj)
    {
        this.tablesArr[tablename] = obj;
    }

    createTable()
    {
        this.tablesArr[this.name] = this.rowArrs;
        this.name = "";
    }

    generateJson()
    {
        var str = JSON.stringify(this.tablesArr);
        return str;
    }

    static jsontodata(data, name)
    {
        var ret = []; // error parse //
        try 
        {
            var obj = JSON.parse(data);
            ret = obj[name];
            return ret;
        } catch (error) {
            ret = [];
            return ret;
        }
    }

    static parse(data)
    {
        var ret = "";
        try 
        {
            var obj = JSON.parse(data);
            ret = obj;
            return ret;
        } catch (error) {
            ret = "";
            console.log("ijson.ts, kesalahan parse " + error);
            return ret;
        }
    }
}