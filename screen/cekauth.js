import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

import Session from "../app/session";
import AlertDialog from "../app/alertdialog";

export default class cekauth extends Component {

    constructor(props) {
        super(props);
        this.AlertDialog = new AlertDialog();
        this.session =  new Session();
    }
    
    async componentDidMount() {
        var isLogin = false;
        await this.session.cekSessionIsLogin().then(row => isLogin = row);
        if(isLogin == 0)
        {
            setTimeout(
                function() {
                    this.props.navigation.navigate('login');
                }
                .bind(this),
                1000
            );
        }
        else
        {
            setTimeout(
                function() {
                    this.props.navigation.navigate('gpspage');
                    this.AlertDialog.toastMsg("anda sudah login..");
                }
                .bind(this),
                1000
            );
        }
    }

    render() {
        return (
            <View style={styles.mainBG}>
                <Image
                    source={require('../img/logoraw_2.png')}
                    style={styles.imgLogo}
                />
                <Text style={styles.fontHeader}>Undangan Online</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    mainBG :{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#bf0056",
    },

    fontHeader:{
        color: 'white', 
        fontSize: 30, 
        paddingTop: 30,
        fontFamily: "Roboto"
    },

    imgLogo :{
        marginTop: 20,
        resizeMode: 'stretch',
        height: 120, 
        width: 120
    }
});
