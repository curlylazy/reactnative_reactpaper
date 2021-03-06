import React, { Component } from 'react';
import { Alert, StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import iHttpRequest from "../../app/ihttprequest";
import IJson from "../../app/ijson";
import AppConfig from "../../app/appconfig";
import ReturnModel from "../../app/returnmodel";
import AlertDialog from "../../app/alertdialog";

export default class registrasi extends Component {

    constructor(props) {
        super(props);

        this.ih = new iHttpRequest();
        this.AlertDialog = new AlertDialog();

        this.state = {
            username: "iwan",
            password: "12345",
            nama: "Wayan Styawan Saputra",
            alamat: "",
            telepon: "",
            email: "",
            jk: "",
        };

    }
    
    saveData = async () =>
    {
        var confirm = await this.AlertDialog.alertConfirm("KONFIRMASI", "submit data registrasi sekarang ?.");
        if(confirm)
        {
            let DataHeader = {
                username: this.state.username,
                password: this.state.password,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                email: this.state.email,
                jk: this.state.jk,
            }
    
            var result = new ReturnModel();
            var ijson = new IJson();
            ijson.newTable("DataHeader");
            ijson.addRowFromObject(DataHeader);
            ijson.createTable();
    
            this.ih.setFormData();
    
            var token = "";
            var postdata = ijson.generateJson();
            var res = await this.ih.sendData(AppConfig.APP_URL, "user/registrasi", token, postdata);
            var resdata = IJson.parse(res);
            
            console.log(postdata);
            console.log(AppConfig.APP_URL);
    
            if(resdata.status == false)
            {
                result.Number = 2;
                result.Message = "Data yang diterima bermasalah, " + resdata.pesan;
                Alert.alert("KESALAHAN", result.Message);
            }
            else
            {
                result.Message = "berhasil menambahkan data user";
                Alert.alert("BERHASIL", result.Message);
            }
        }
    }

    logoutClick = () => {
        // this.props.navigation.navigate('Signin');
    }

    render() {
        return (
            <ScrollView>
                
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
                    <Appbar.Content title="Registrasi" />
                </Appbar.Header>
                
                <View>
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
                        <Col sm={12} style={{ marginTop: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="Nama"
                                value={this.state.nama}
                                onChangeText={(nama) => this.setState({ nama })}
                            />
                        </Col>
                        <Col sm={12} style={{ marginTop: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="Alamat"
                                value={this.state.alamat}
                                onChangeText={(alamat) => this.setState({ alamat })}
                            />
                        </Col>
                        <Col sm={12} style={{ marginTop: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="No Telepon"
                                keyboardType='numeric'
                                value={this.state.telepon}
                                onChangeText={(telepon) => this.setState({ telepon })}
                            />
                        </Col>
                        <Col sm={12} style={{ marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <RadioButton
                                    value="P"
                                    status={ this.state.jk === 'P' ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ jk: 'P' })}
                                />
                                <Text style={{ marginTop: 10 }}>Perempuan</Text>

                                <RadioButton
                                    value="L"
                                    status={ this.state.jk === 'L' ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ jk: 'L' })}
                                />
                                <Text style={{ marginTop: 10 }}>Laki - laki</Text>
                            </View>
                        </Col>

                        <Col sm={12} style={{ marginTop: 10 }}>
                            <Button mode="contained" onPress={this.saveData}>
                                <Icon name="save" /> SIMPAN
                            </Button>
                        </Col>
                    </Row>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});