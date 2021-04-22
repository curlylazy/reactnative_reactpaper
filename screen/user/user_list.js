import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar, ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button, RadioButton, Text, Searchbar, List } from 'react-native-paper';
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

export default class user_list extends Component {

    constructor(props) {
        super(props);

        this.ih = new iHttpRequest();
        this.AlertDialog = new AlertDialog();

        this.state = {

            katakunci: "",
            pageNumber: 1,
            datalist: [],

            isMenuVisible: true,
            isLoading: true
        };

    }
    
    componentDidMount = () => {
        this.readData();
    }

    readData = async () =>
    {
        this.setState({ isLoading : true });

        var result = new ReturnModel();

        var ijson = new IJson();
        ijson.newTable("DataHeader");
        ijson.addRow("katakunci", this.state.katakunci);
        ijson.addRow("page", this.state.pageNumber);
        ijson.endRow();
        ijson.createTable();

        this.ih.setFormData();

        var token = "";
        var postdata = ijson.generateJson();
        var res = await this.ih.sendData(AppConfig.APP_URL, "user/list", token, postdata);
        
        this.setState({ isLoading : false });

        var resdata = IJson.parse(res);
        if(resdata.status == false)
        {
            result.Message = "Data yang diterima bermasalah, " + resdata.pesan;
            Alert.alert("KESALAHAN", result.Message);
            return;
        }

        var rows = IJson.jsontodata(res, 'DataUser');
        if (rows == null)
        {
            result.Message = "Data yang diterima bermasalah, " + resdata.pesan;
            Alert.alert("KESALAHAN", result.Message);
            return;
        }

        console.log(rows);
        this.setState({ datalist : rows });
        
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
            <ScrollView>
                
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
                    <Appbar.Content title="Daftar User" />
                    <Appbar.Action icon="refresh" onPress={() => this.readData()} />
                    <Appbar.Action icon="plus" onPress={() => this.props.navigation.navigate('user_ae', { save_mode: "**new" })} />
                    <Menu>
                        <MenuTrigger>
                            <Icon name="dots-vertical" size={25}/>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => alert(`Save`)} text="Tambah Baru"></MenuOption>
                            <MenuOption onSelect={() => alert(`Save`)} text='Refresh' />
                        </MenuOptions>
                    </Menu>
                </Appbar.Header>
                
                <ProgressDialog visible={this.state.isLoading} label="Loading.."/>

                <View>
                    <Row size={12} style={{ padding: 10 }}>
                        <Col sm={12}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={(katakunci) => this.setState({ katakunci }) }
                            onSubmitEditing={() => this.readData() }
                        />
                        </Col>
                        <Col sm={12}>
                            {
                                this.state.datalist.map((row, index) => {
                                    return (
                                        <List.Item key={index}
                                            title={ row['nama'] }
                                            description={ row['alamat'] + "\n" + row['telepon'] }
                                            left={props => <List.Icon {...props} icon="account" />}
                                        />
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});