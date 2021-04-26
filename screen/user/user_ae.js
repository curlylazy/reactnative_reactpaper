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


// function user_ae({ route, navigation }) {
//     /* 2. Get the param */
//     const { save_mode, otherParam } = route.params;

//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//         <Text>itemId: {JSON.stringify(save_mode)}</Text>
//         <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//         <Button
//           title="Go to Details... again"
//           onPress={() =>
//             navigation.push('Details', {
//               itemId: Math.floor(Math.random() * 100),
//             })
//           }
//         />
//         <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//         <Button title="Go back" onPress={() => navigation.goBack()} />
//       </View>
//     );
//   }

//   export default user_ae;
// https://blog.logrocket.com/navigating-react-native-apps-using-react-navigation/

export default class user_ae extends Component {

    constructor(props) {
        super(props);

        this.ih = new iHttpRequest();
        this.AlertDialog = new AlertDialog();

        this.state = {

            save_mode: "",
            judul_page: "",

            username: "",
            password: "",
            nama: "",
            alamat: "",
            telepon: "",
            email: "",
            jk: "P",
        };
    }
    
    componentDidMount() {

        this.state.save_mode = this.props.route.params.save_mode;

        if(this.state.save_mode == "**new")
            this.state.judul_page = "Tambah User";
        else
            this.state.judul_page = "Edit User";

        this.setState({judul_page : this.state.judul_page});
    }

    saveData = async () =>
    {
        if(this.state.username == "")
        {
            Alert.alert("KESALAHAN", "[username] masih kosong.");
            return
        }

        else if(this.state.password == "")
        {
            Alert.alert("KESALAHAN", "[password] masih kosong.");
            return
        }

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
            var res = await this.ih.sendData(AppConfig.APP_URL, "user/tambah", token, postdata);
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
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('user_list')} />
                    <Appbar.Content title={this.state.judul_page} />
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