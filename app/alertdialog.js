import { Alert, ToastAndroid } from 'react-native';
import Toast from 'react-native-toast-message';

export default class AlertDialog
{
    
    constructor()
    {

    }

    toastMsg(pesan)
    {
        ToastAndroid.show(pesan, ToastAndroid.LONG);
    }

    // send data dengan file
    alertConfirm(judul, pesan)
    {
        return new Promise((resolve, reject) => {
            Alert.alert(
                judul,
                pesan,
                [
                    {text: 'Tidak', onPress: () => resolve(false) },
                    {text: 'Ya', onPress: () => resolve(true) }
                ]
            )
        })
    }

}
