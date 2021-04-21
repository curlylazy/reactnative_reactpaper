import React, { Component } from 'react';
import { Alert, StyleSheet, View, StatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class registrasi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            nama: "",
        };

    }
    
    // FUNCTION ============================
    saveData_Confirm = () => {
        Alert.alert(
            "KONFIRMASI",
            "simpan data registrasi sekarang ?",
            [
                { text: "Cancel" },
                { text: "OK", onPress: () => this.saveData() }
            ]
        );
    }

    saveData = () =>
    {
        
    }

    logoutClick = () => {
        // this.props.navigation.navigate('Signin');
    }

    render() {
        return (
            <View>
                
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
                                onChangeText={(username) => this.setState({ username })}
                            />
                        </Col>
                        <Col sm={12} style={{ marginTop: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="Password"
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </Col>
                        <Col sm={12} style={{ marginTop: 10 }}>
                            <TextInput
                                mode="outlined"
                                label="Nama"
                                onChangeText={(nama) => this.setState({ nama })}
                            />
                        </Col>
                        <Col sm={12} style={{ marginTop: 10 }}>
                            <Button mode="contained" onPress={this.saveData_Confirm}>
                                <Icon name="save" /> SIMPAN
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