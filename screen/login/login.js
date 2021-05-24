import React, { Component } from 'react';
import { Alert, StyleSheet, View, StatusBar, ScrollView, ImageBackground, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressDialog from 'react-native-progress-dialog';

import SQLite from "react-native-sqlite-2";

// style
import css from '../../style/styles';

import AppConfig from "../../app/appconfig";
// import Session from "../../app/session";
import AlertDialog from "../../app/alertdialog";

// service
import login_service from "../../service/login/login_service";

export default class login extends Component {

    constructor(props) {
        super(props);

        this.AlertDialog = new AlertDialog();
        this.loginService = new login_service();
        // this.session =  new Session();

        this.db = SQLite.openDatabase("reactpaper.db", "1.0", "", 1);

        this.state = {

            username: "iwan",
            password: "12345",

            isLoading: false,
        };
    }
    
    componentDidMount() {
        
    }

    login = async () =>
    {
        this.setState({ isLoading : true });
        this.loginService.Username = this.state.username;
        this.loginService.Password = this.state.password;
        var res = await this.loginService.cekLogin();
        this.setState({ isLoading : false });

        if(res.Number != 0)
        {
            this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
            return;
        }

        var row = res.Data;
        // console.log(row);

        // simpan session
        // this.session.saveSession(row);

        this.db.transaction(function (txn) {
            txn.executeSql("DROP TABLE IF EXISTS tbl_session", []);
            txn.executeSql(
                "CREATE TABLE IF NOT EXISTS tbl_session( " +
                    " username VARCHAR(30) PRIMARY KEY NOT NULL, " +
                    " nama VARCHAR(100), " +
                    " usertoken VARCHAR(255), " +
                    " email VARCHAR(50) " +
                ")",
                []
            );

            txn.executeSql("INSERT INTO tbl_session (username, nama, usertoken, email) VALUES (:username, :nama, :email)", [row.username, row.nama, row.usertoken, row.email]);
            txn.executeSql("SELECT * FROM `tbl_session`", [], function (tx, res) {
                for (let i = 0; i < res.rows.length; ++i) {
                    row = res.rows.item(i);
                    console.log(row);
                    //console.log("item:", res.rows.item(i));
                }
            });
        });
        
        this.AlertDialog.toastMsg("Berhasil login ke dalam sistem.");
        this.props.navigation.navigate('dashboard');
    }

    render() {
        return (
            <View>
                
                <StatusBar 
                    translucent 
                    backgroundColor="transparent" />

                <ImageBackground
                    source={require('../../img/bg_6.jpg')}
                    imageStyle={{resizeMode: 'stretch'}}
                    style={styles.imgBackground}
                >
                    <Image
                        source={require('../../img/login.png')}
                        style={styles.imgLogo}
                    />

                    <Text style={styles.fontHeader}>LOGIN</Text>
                    <Text style={styles.fontSubHeader}>masukkan username dan password</Text>
                </ImageBackground>
                
                {/* progress dialog */}
                <ProgressDialog visible={this.state.isLoading} label="Loading.."/>

                <View>
                    <ScrollView>
                        <Row size={12} style={{ padding: 10 }}>
                            <Col sm={12}>
                                <TextInput
                                    mode="outlined"
                                    label="Username"
                                    value={this.state.username}
                                    onChangeText={(username) => this.setState({ username })}
                                />
                            </Col>
                            <Col sm={12} style={{ marginTop: 10 }}>
                                <TextInput
                                    mode="outlined"
                                    label="Password"
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Col>

                            <Col sm={12}>
                                <Button mode="contained" style={{ marginTop: 20 }} onPress={() => this.login()} color="brown">
                                    <Icon name="login" />
                                    <Text> LOGIN</Text>
                                </Button>
                            </Col>
                        </Row>
                    </ScrollView>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    fontHeader:{
        color: 'white', 
        fontSize: 30, 
        fontFamily: "Roboto"
    },

    fontSubHeader:{
        color: 'white', 
        fontSize: 16, 
        fontFamily: "Roboto"
    },

    imgBackground:{
        height: 250, 
        alignItems: "center"
    },

    icon: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
    },

    imgLogo :{
        marginTop: 20,
        resizeMode: 'stretch',
        height: 120, 
        width: 120
    }
});