export const mainURL = 'http://192.168.102.50/lumen_2021/public';
export const imgDir = 'http://192.168.102.50/reactwebservice_bengkel/data/gambar_upload';

export function FormatNumber(val) {
    var iRes = 0;

    var parts = val.toString().split(".");
    iRes = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

    return iRes;
}
