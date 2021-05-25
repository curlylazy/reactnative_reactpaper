import React, { Component } from 'react';
import { Alert, StyleSheet, View, StatusBar, ScrollView, PermissionsAndroid, Image, SafeAreaView } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button, RadioButton, Text, Appbar } from 'react-native-paper';

import Geolocation from 'react-native-geolocation-service';

// style
import css from '../../style/styles';

import AlertDialog from "../../app/alertdialog";

export default class gpspage extends Component {

    constructor(props) {
        super(props);

        this.AlertDialog = new AlertDialog();

        this.state = {
            longitude: "",
            latitude: ""
        };
    }
    
    async componentDidMount() {
        await this.getcurrentlocation();
    }

    getcurrentlocation = async() =>
    {
        var granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position.coords);
                    this.setState({ 
                        longitude: position.coords.longitude, 
                        latitude: position.coords.latitude
                    });
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }

    click_Reset = async () =>
    {
        await this.getcurrentlocation();
        this.setState({ longitude: "", latitude: "" });
    }

    render() {
        return (
            <SafeAreaView style={css.droidSafeArea}>
                
                <StatusBar 
                    translucent 
                    backgroundColor="#a35709" 
                />

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => this.props.navigation.navigate('dashboard')} />
                    <Appbar.Content title="GPS" />
                    <Appbar.Action icon="refresh" onPress={() => this.click_Reset()} />
                </Appbar.Header>

                <View>
                    <Text>Longitude : {this.state.longitude}, Latitude : {this.state.latitude}</Text>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    fontHeader:{
        color: 'white', 
        fontSize: 30, 
        fontFamily: "Roboto"
    },
});