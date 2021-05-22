import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar, ScrollView, View, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button, RadioButton, Text, Searchbar, List, Paragraph, Dialog, Portal, TouchableRipple } from 'react-native-paper';
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
import iHttpRequest from "../../app/ihttprequest";
import IJson from "../../app/ijson";
import AppConfig from "../../app/appconfig";
import ReturnModel from "../../app/returnmodel";
import AlertDialog from "../../app/alertdialog";

// service
import user_list_service from "../../service/user/user_list_service";
import { color } from 'react-native-reanimated';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

export default class user_list extends Component {

    constructor(props) {
        super(props);

        this.ih = new iHttpRequest();
        this.AlertDialog = new AlertDialog();
        this.userService = new user_list_service();

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

        this.userService.KataKunci = this.state.katakunci;
        var res = await this.userService.requestData(this.state.pageNumber);

        this.setState({ 
            totalData : this.userService.TotalData, 
            totalPage : this.userService.TotalPage,
            isLoading : false
        });

        if(res.Number != 0)
        {
            this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
            return;
        }

        this.setState({ datalist : res.Data });
    }

    click_editData = () => {
        this.setState({ isShowPopup: false });
        var row = this.state.selectedRow;
        this.props.navigation.navigate('user_ae', { rowparam: row, save_mode: "**upd" });
    }

    click_hapusData = async () => {
        this.setState({ isShowPopup: false });
        var row = this.state.selectedRow;
        var confirm = await this.AlertDialog.alertConfirm("KONFIRMASI", "hapus data, kode : " + row.username);
        if(confirm)
        {
            this.setState({ isLoading : true });
            var res = await this.userService.deleteData(row.kodeuser);
            this.setState({ isLoading : false });

            if(res.Number != 0)
            {
                this.AlertDialog.toastMsg("KESALAHAN : " + res.Message);
                return;
            }
        }

        this.readData();
    }

    click_OpenPopup = (row) => {
        this.setState({ selectedRow: row });
        this.setState({ isShowPopup: true });
        console.log(this.state.selectedRow);
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
            <View style={css.droidSafeArea}>
                
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
                    <Appbar.Content title="Daftar User" />
                    <Appbar.Action icon="refresh" onPress={() => this.click_Reset()} />
                    <Appbar.Action icon="plus" onPress={() => this.props.navigation.navigate('user_ae', { save_mode: "**new" })} />
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

                {/* popup list click */}
                <Portal>
                    <Dialog visible={this.state.isShowPopup} onDismiss={()=> this.hideDialog()}>
                        <Dialog.Title>Pilihan : [{this.state.selectedRow.username}]</Dialog.Title>
                        <Dialog.Content>
                            <TouchableRipple onPress={() => this.click_editData()}>
                                <List.Item
                                    title="Edit"
                                    left={props => <List.Icon {...props} icon="pencil" />}
                                />
                            </TouchableRipple>
                            <TouchableRipple onPress={() => this.click_hapusData()}>
                                <List.Item
                                    title="Hapus"
                                    left={props => <List.Icon {...props} icon="delete" />}
                                />
                            </TouchableRipple>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=> this.hideDialog()}>Tutup</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                
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
                <View style={{flex: 1}}>
                    <ScrollView>
                        <Row size={12} style={{ padding: 10 }}>
                            <Col sm={12}>
                                {
                                    this.state.datalist.map((row, index) => {
                                        return (
                                            <TouchableOpacity key={row.kodeuser} onPress={() => this.click_OpenPopup(row)}>
                                                <List.Item key={index}
                                                    title={ row['nama'] }
                                                    description={ row['alamat'] + "\n" + row['telepon'] }
                                                    left={props => <List.Icon {...props} icon="account" />}
                                                />
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </Col>
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
                            <Text style={{ color: 'white' }}>{this.state.pageNumber} / {this.state.totalPage}</Text>
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