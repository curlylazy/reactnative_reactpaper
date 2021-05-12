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

import iHttpRequest from "../../app/ihttprequest";
import IJson from "../../app/ijson";
import AppConfig from "../../app/appconfig";
import ReturnModel from "../../app/returnmodel";
import AlertDialog from "../../app/alertdialog";

import user_list_service from "../../service/user/user_list_service";

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

        this.setState({ isLoading : false });

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

    render() {

        var payments = [];
        for(let i = 0; i < 20; i++){
            payments.push(
                <TouchableOpacity key={i}>
                    <List.Item
                        title='Halo ini test'
                        description='ini keterangan'
                        left={props => <List.Icon {...props} icon="account" />}
                    />
                </TouchableOpacity>
            )
        }

        return (
            // <View>
                
            //     <StatusBar
            //         animated={true}
            //         backgroundColor="#a35709" />

            //     <Appbar.Header>
            //         <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
            //         <Appbar.Content title="[Testing] Footer" />
            //         <Appbar.Action icon="refresh" onPress={() => this.readData()} />
            //         <Appbar.Action icon="plus" onPress={() => this.props.navigation.navigate('user_ae', { save_mode: "**new" })} />
            //         <Menu>
            //             <MenuTrigger>
            //                 <Icon name="dots-vertical" size={25}/>
            //             </MenuTrigger>
            //             <MenuOptions>
            //                 <MenuOption onSelect={() => alert('Save')} text="Tambah Baru"></MenuOption>
            //                 <MenuOption onSelect={() => alert('Save')} text='Refresh' />
            //             </MenuOptions>
            //         </Menu>
            //     </Appbar.Header>
                
            //     <ProgressDialog visible={this.state.isLoading} label="Loading.."/>

            // </View>

            <View style={{flex: 1}}>
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
                    <Appbar.Content title="[Testing] Footer" />
                    <Appbar.Action icon="refresh" onPress={() => this.readData()} />
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

                <View style={{height: 50, backgroundColor: 'green'}} />
                <View style={{flex: 1, backgroundColor: 'red'}}>
                    <ScrollView>
                        { payments }
                    </ScrollView>
                </View>
                <View style={{height: 50, backgroundColor: 'green'}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});