import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar, ScrollView, View, SafeAreaView } from 'react-native';
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
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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

export default class maps extends Component {

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
            isLoading: false,
            isShowPopup: false,

            region: {
                latitude: -8.608233,
                longitude: 115.159372,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
                // latitudeDelta: 0.0922,
                // longitudeDelta: 0.0421,
            },

            markers: [
                {
                    latlng: {latitude: -8.608233, longitude: 115.159372},
                    title: "Toko Besi Sinar Jaya",
                    description: "menjual berbagai macam peralatan"
                },
                {
                    latlng: {latitude: -8.608756, longitude: 115.158528},
                    title: "Toko Alat Senang Senang",
                    description: "menjual peralatan untuk bersenang senang"
                },
                {
                    latlng: {latitude: -8.608767, longitude: 115.159474},
                    title: "Rumah Sakit Suka Cita",
                    description: "rumah sakit bagi orang orang sehat"
                },
                {
                    latlng: {latitude: -8.609057, longitude: 115.159265},
                    title: "Lapangan Futsal Basket",
                    description: "ingin bermain bulutangkis ?, silahkan kesini."
                }
            ]
        };
    }
    
    componentDidMount = () => {
        this.readData();
    }

    getCoordinates = (e) => {
        console.log(e);
    }

    click_Reset = () =>
    {
        let region = {
            latitude: -8.608233,
            longitude: 115.159372,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        }

        this.setState({ region : region });
    }

    readData = async () =>
    {
        
    }

    render() {
        return (
            <SafeAreaView style={css.droidSafeArea}>
                
                <StatusBar
                    animated={true}
                    backgroundColor="#a35709" />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
                    <Appbar.Content title="Maps" />
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
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={this.state.region}
                        onPress={(event) => this.getCoordinates(event.nativeEvent.coordinate)}
                    >
                        {this.state.markers.map((marker, index) => (
                            <Marker
                                key={index}
                                coordinate={marker.latlng}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}
                    </MapView>
                </View>
                <View style={ css.footer }>
                    
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});