export default class NumberFunction
{
    constructor(){
       this.numeral = require('numeral');
    }

    ToNumber(vars)
    {
        let iRes = 0;
        iRes = this.numeral(vars).value();

        if(vars == null || vars == "")
            iRes = 0;

        return iRes;
    }

    ToString(vars)
    {
        let iRes = "";
        if(vars == null || vars == "" || typeof vars === 'undefined')
        {
            iRes = this.numeral(0).format('0,0');
        }
        else
        {
            iRes = this.numeral(vars).format('0,0');
        }

        return iRes;
    }
}
