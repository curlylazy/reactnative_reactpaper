import moment from 'moment'

export default class StringFunction
{
    constructor(){

    }

    isEmptyOrNull(vars)
    {
        if(vars == "")
        {
            return true;
        }

        if(vars == null)
        {
            return true;
        }

        return false
    }

    FormatTanggal(vars)
    {
        var iRes = "";
        iRes = moment(String(vars)).format('dddd, MMMM Do YYYY');
        return iRes;
    }

    StatusTransaksi(vars)
    {
        var iRes = "";

        if(vars == 0)
            iRes = "Pending";

        else if(vars == 1)
            iRes = "Menunggu Konfrimasi";

        else if(vars == 2)
            iRes = "Valid";

        else if(vars == 3)
            iRes = "Sudah  Terkirim";

        else if(vars == 4)
            iRes = "Gagal";

        else if(vars == 5)
            iRes = "Dibatalkan";

        return iRes;
    }

    JenisPelanggan(vars)
    {
        var iRes = "";

        if(vars == "RT")
            iRes = "Rumah Tangga";

        else if(vars == "PR")
            iRes = "Perusahaan";

        return iRes;
    }
}
