import axios from 'axios'

export default class iHttpRequest
{
    postData = null;
    postDataFile = null;

    constructor()
    {

    }

    // send data dengan file
    setFormData()
    {
        this.postDataFile = new FormData();
    }

    addPost(postname, postimg)
    {
        this.postDataFile.append(postname, postimg);
    }

    async sendData(url, modname, token, post)
    {
        let resdt = "";

        this.postDataFile.append("token", token);
        this.postDataFile.append("postdata", post);

        await axios({
            method: 'post',
            url: url + "/" + modname,
            data: this.postDataFile,
            responseType : 'text',
            headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(function (response){
            resdt = JSON.stringify(response.data);
        }).catch(function(error) {
            resdt = JSON.stringify({status: false, pesan: "Pesan Kesalahan :: " + error + ", tidak ditemukan"});
        });

        return resdt;
    }

}
