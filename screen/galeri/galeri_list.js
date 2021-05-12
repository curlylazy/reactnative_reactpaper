import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar, ScrollView, View, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button, RadioButton, Text, Searchbar, List, Paragraph, Dialog, Portal, TouchableRipple } from 'react-native-paper';
import { Avatar, Card, Title } from 'react-native-paper';
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

// app
import AppConfig from "../../app/appconfig";
import AlertDialog from "../../app/alertdialog";

// service
import galeri_list_service from "../../service/galeri/galeri_list_service";

export default class galeri_list extends Component {

    constructor(props) {
        super(props);

        this.AlertDialog = new AlertDialog();
        this.galeriService = new galeri_list_service();

        this.state = {
            katakunci: "",
            pageNumber: 1,
            totalData: 0,
            totalPage: 0,
            datalist: [],
            selectedRow: [],

            isMenuVisible: true,
            isLoading: true,
            isShowPopup: false,
        };
    }
    
    componentDidMount = () => {
        this.readData();
    }

    readData = async () =>
    {
        this.setState({ isLoading : true });

        this.galeriService.KataKunci = this.state.katakunci;
        var res = await this.galeriService.requestData(this.state.pageNumber);

        this.setState({ 
            totalData : this.galeriService.TotalData, 
            totalPage : this.galeriService.TotalPage,
            isLoading : false
        });

        if(res.Number != 0)
        {
            this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
            return;
        }

        this.setState({ datalist : res.Data });
    }

    click_editData = (row) => {
        this.props.navigation.navigate('galeri_ae', { rowparam: row, save_mode: "**upd" });
    }

    click_hapusData = async (row) => {
        var confirm = await this.AlertDialog.alertConfirm("KONFIRMASI", "hapus data, kode : " + row.judulgaleri);
        if(confirm)
        {
            this.setState({ isLoading : true });
            var res = await this.galeriService.deleteData(row.kodegaleri);
            this.setState({ isLoading : false });

            if(res.Number != 0)
            {
                this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
                return;
            }
        }

        this.readData();
    }

    hideDialog = () => {
        this.setState({ isShowPopup: false });
    }

    click_Reset = async () => {
        await this.setState({ 
            pageNumber: 1, 
            totalPage: 0,
            katakunci: ""
        });
        this.readData();
    }

    click_PrevPage = async () => {
        if(this.state.pageNumber <= 1)
        {
            return;
        }
            
        var page =  this.state.pageNumber - 1;
        await this.setState({ pageNumber: page });
        this.readData();
    }

    click_NextPage = async () => {
        if(this.state.pageNumber == this.state.totalPage)
        {
            return;
        }

        var page =  this.state.pageNumber + 1;
        await this.setState({ pageNumber: page });
        this.readData();
    }

    click_OpenMenu = () => {
        // this.props.navigation.navigate('Signin');
        this.setState({ isMenuVisible: true });
    }

    click_CloseMenu = () => {
        // this.props.navigation.navigate('Signin');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
                    <Appbar.Content title="Daftar Galeri" />
                    <Appbar.Action icon="refresh" onPress={() => this.click_Reset()} />
                    <Appbar.Action icon="plus" onPress={() => this.props.navigation.navigate('galeri_ae', { save_mode: "**new" })} />
                    <Menu>
                        <MenuTrigger>
                            <Icon name="dots-vertical" size={25}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => alert('Save')} text="Tambah Baru"></MenuOption>
                            <MenuOption onSelect={() => alert('Save')} text='Refresh' />
                        </MenuOptions>
                    </Menu>
                </Appbar.Header>
                
                {/* progress dialog */}
                <ProgressDialog visible={this.state.isLoading} label="Loading.."/>

                <View style={{height: 50}}>
                    <Row size={12} style={{ padding: 10 }}>
                        <Col sm={12}>
                            <Searchbar
                                placeholder="Search"
                                onChangeText={(katakunci) => this.setState({ katakunci }) }
                                onSubmitEditing={() => this.readData() }
                            />
                        </Col>
                    </Row>
                </View>
                <View style={{flex: 1, paddingTop: 10}}>
                    <ScrollView>
                        <Row size={12} style={{ padding: 5 }}>
                            {
                                this.state.datalist.map((row, index) => {
                                    return (
                                        <Col sm={6} style={{ padding: 5 }}>
                                            <Card>
                                                <Card.Title title={row.kodegaleri} subtitle={row.judulgaleri} />
                                                <Card.Cover source={{ uri: AppConfig.APP_URL_IMG + '/' + row.gambargaleri }} />
                                                <Card.Actions>
                                                    <Button onPress={() => this.click_editData(row)}>Edit</Button>
                                                    <Button onPress={() => this.click_hapusData(row)}>Hapus</Button>
                                                </Card.Actions>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </ScrollView>
                </View>
                <View style={ css.footer }>
                    <Row size={12} style={{ padding: 10 }}>
                        <Col sm={4}>
                            <Button mode="contained" onPress={() => this.click_PrevPage()} color="white">
                                <Icon name="skip-previous" />
                                <Text>PREV</Text>
                            </Button>
                        </Col>
                        <Col sm={4} style={ css.footer_pageinfo }>
                            <Text>{this.state.pageNumber} / {this.state.totalPage}</Text>
                        </Col>
                        <Col sm={4}>
                            <Button mode="contained" onPress={() => this.click_NextPage()} color="white">
                                <Text>NEXT</Text>
                                <Icon name="skip-next" />
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