import React, { Component } from 'react';
import { Alert, StyleSheet, View, StatusBar, ScrollView, Image } from 'react-native';
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

import { launchImageLibrary } from 'react-native-image-picker';

// style
import css from '../../style/styles';

// app
import AppConfig from "../../app/appconfig";
import AlertDialog from "../../app/alertdialog";

// service
import galeri_ae_service from "../../service/galeri/galeri_ae_service";

export default class galeri_ae extends Component {

    constructor(props) {
        super(props);

        this.AlertDialog = new AlertDialog();
        this.galeriService = new galeri_ae_service();

        this.state = {

            save_mode: "",
            judul_page: "",
            subjudul_page: "",

            kodegaleri: "",
            judulgaleri: "",
            gambargaleri: "",
            gambargaleri_url: AppConfig.APP_URL_IMG + '/noimage.jpg',
            keterangangaleri: "",

            isLoading: false,
        };
    }
    
    componentDidMount() {

        this.state.save_mode = this.props.route.params.save_mode;
        if(this.state.save_mode == "**new")
        {
            this.setState({judul_page : "Tambah Galeri"});
            this.galeriService.setModeAct("");
        }    
        else
        {
            let rowparam = this.props.route.params.rowparam;
            this.galeriService.setModeAct(rowparam.kodegaleri);
            this.setState({
                judul_page : "Edit Galeri",
                subjudul_page : rowparam.judulgaleri 
            });
            this.readData();
        }
    }

    readData = async () =>
    {
        this.setState({ isLoading : true });
        var res = await this.galeriService.readData();
        this.setState({ isLoading : false });

        if(res.Number != 0)
        {
            this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
            return;
        }

        let row = res.Data;
        this.setState({ 
            kodegaleri: row.kodegaleri,
            judulgaleri: row.judulgaleri,
            gambargaleri_url: AppConfig.APP_URL_IMG + '/' + row.gambargaleri,
            keterangangaleri: row.keterangangaleri,
        });
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }

        launchImageLibrary({ noData: true }, (response) => {
            if (response) {
                this.setState({ gambargaleri: response, gambargaleri_url: response.uri })
            }
        });
    }

    saveData = async () =>
    {
        if(this.state.judulgaleri == "")
        {
            Alert.alert("KESALAHAN", "[judulgaleri] masih kosong.");
            return
        }

        var confirm = await this.AlertDialog.alertConfirm("KONFIRMASI", "submit data sekarang ?.");
        if(confirm)
        {
            this.setState({ isLoading : true });

            let DataHeader = {
                kodegaleri: this.state.kodegaleri,
                judulgaleri: this.state.judulgaleri,
                gambargaleri: this.state.gambargaleri,
                keterangangaleri: this.state.keterangangaleri,
            }

            this.galeriService.DataHeader = DataHeader;
            var res = await this.galeriService.saveData();

            this.setState({ isLoading : false });

            if(res.Number != 0)
            {
                this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
                return;
            }

            this.AlertDialog.toastMsg(res.Message);

            if(this.galeriService.SAVE_MODE == AppConfig.SAVE_MODE_ADD)
                this.props.navigation.navigate('galeri_list');
            else
                this.readData();
        }
    }

    render() {

        const { gambargaleri } = this.state

        return (
            <View style={{flex: 1}}>
                
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('galeri_list')} />
                    <Appbar.Content title={this.state.judul_page} subtitle={this.state.subjudul_page} />
                    <Menu>
                        <MenuTrigger>
                            <Icon name="dots-vertical" size={25}/>
                        </MenuTrigger>
                        <MenuOptions>
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
                                    label="Judul"
                                    value={this.state.judulgaleri}
                                    onChangeText={(judulgaleri) => this.setState({ judulgaleri })}
                                />
                            </Col>
                            <Col sm={12} style={{ marginTop: 10 }}>
                                <TextInput
                                    mode="outlined"
                                    label="Keterangan"
                                    value={this.state.keterangangaleri}
                                    onChangeText={(keterangangaleri) => this.setState({ keterangangaleri })}
                                />
                            </Col>
                            <Col sm={12} style={{ marginTop: 10 }}>
                                <Button onPress={() => this.handleChoosePhoto()} mode="contained" style={{ width: 150 }}>
                                    <Icon name="image" />
                                    <Text>Pilih Gambar</Text>
                                </Button>
                                <Image
                                    source={{ uri: this.state.gambargaleri_url }}
                                    style={{ width: '100%', height: 300, marginTop: 10 }}
                                />
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