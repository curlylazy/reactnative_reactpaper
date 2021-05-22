import React, { Component } from 'react';
import { Alert, StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressDialog from 'react-native-progress-dialog';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

// style
import css from '../../style/styles';

import AppConfig from "../../app/appconfig";
import AlertDialog from "../../app/alertdialog";

// service
import user_ae_service from "../../service/user/user_ae_service";

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

        this.AlertDialog = new AlertDialog();
        this.userService = new user_ae_service();

        this.state = {

            save_mode: "",
            judul_page: "",
            subjudul_page: "",

            username_old: "",
            kodeuser: "",
            username: "",
            password: "",
            nama: "",
            alamat: "",
            telepon: "",
            email: "",
            jk: "P",

            isLoading: false,
        };
    }
    
    componentDidMount() {

        this.state.save_mode = this.props.route.params.save_mode;
        if(this.state.save_mode == "**new")
        {
            this.setState({judul_page : "Tambah User"});
            this.userService.setModeAct("");
        }    
        else
        {
            let rowparam = this.props.route.params.rowparam;
            this.userService.setModeAct(rowparam.kodeuser);
            this.setState({
                judul_page : "Edit User",
                subjudul_page : rowparam.nama 
            });
            this.readData();
        }
    }

    readData = async () =>
    {
        this.setState({ isLoading : true });
        var res = await this.userService.readData();
        this.setState({ isLoading : false });

        if(res.Number != 0)
        {
            this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
            return;
        }

        let row = res.Data;
        this.setState({ 
            kodeuser: row.kodeuser,
            username: row.username,
            username_old: row.username,
            password: row.password_enc,
            nama: row.nama,
            alamat: row.alamat,
            telepon: row.telepon,
            email: row.email,
            jk: row.jk,
        });
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

        var confirm = await this.AlertDialog.alertConfirm("KONFIRMASI", "submit data sekarang ?.");
        if(confirm)
        {
            this.setState({ isLoading : true });

            let DataHeader = {
                username_old: this.state.username_old,
                kodeuser: this.state.kodeuser,
                username: this.state.username,
                password: this.state.password,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                email: this.state.email,
                jk: this.state.jk,
            }

            this.userService.DataHeader = DataHeader;
            var res = await this.userService.saveData();

            this.setState({ isLoading : false });

            if(res.Number != 0)
            {
                this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
                return;
            }

            this.AlertDialog.toastMsg(res.Message);

            if(this.userService.SAVE_MODE == AppConfig.SAVE_MODE_ADD)
                this.props.navigation.navigate('user_list');
            else
                this.readData();
        }
    }

    render() {
        return (
            <View style={css.droidSafeArea}>
                
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('user_list')} />
                    <Appbar.Content title={this.state.judul_page} subtitle={this.state.subjudul_page} />
                    <Menu>
                        <MenuTrigger>
                            <Icon name="dots-vertical" size={25}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => this.props.navigation.navigate('user_ae', { save_mode: "**new" })} text="Tambah Baru"></MenuOption>
                            <MenuOption onSelect={() => this.readData()} text='Refresh' />
                        </MenuOptions>
                    </Menu>
                </Appbar.Header>
                
                {/* progress dialog */}
                <ProgressDialog visible={this.state.isLoading} label="Loading.."/>

                <View style={{flex: 1}}>
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
                        </Row>
                    </ScrollView>
                </View>
                <View style={ css.footer }>
                    <Row size={12} style={{ padding: 10 }}>
                        <Col sm={12}>
                            <Button mode="contained" onPress={() => this.saveData()} color="white">
                                <Icon name="content-save" />
                                <Text>SIMPAN</Text>
                            </Button>
                        </Col>
                    </Row>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

});