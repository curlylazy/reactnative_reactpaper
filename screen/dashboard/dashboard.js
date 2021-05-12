import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

export default class dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            katakunci: '',
            person: []
        };
    }

    // FUNCTION ============================
    
    logoutClick = () => {
        // this.props.navigation.navigate('Signin');
    }

    render() {
        return (
            <View>
                <ImageBackground
                    source={require('../../img/bg_4.jpg')}
                    imageStyle={{resizeMode: 'stretch'}}
                    style={styles.imgBackground}
                >
                    <Image
                        source={require('../../img/logoraw_2.png')}
                        style={styles.imgLogo}
                    />

                    <Text style={styles.fontHeader}>UNDANGAN ONLINE</Text>
                    <Text style={styles.fontSubHeader}>selamat datang di undangan online</Text>
                </ImageBackground>

                <View>
                    <Row size={12} style={{ marginTop: 20 }}>
                        <Col sm={4} style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('registrasi')}>
                                <Image
                                    source={require('../../img/registrasi.png')}
                                    style={styles.icon}
                                />
                                <Text style={{ marginTop: 15 }}>REGISTRASI</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col sm={4} style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('user_list')}>
                                <Image
                                    source={require('../../img/daftaritem.png')}
                                    style={styles.icon}
                                />
                                <Text style={{ marginTop: 15 }}>DAFTAR USER</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col sm={4} style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('footer')}>
                                <Image
                                    source={require('../../img/daftaritem.png')}
                                    style={styles.icon}
                                />
                                <Text style={{ marginTop: 15 }}>FOOTER TEXT</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={4} style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('galeri_list')}>
                                <Image
                                    source={require('../../img/galeri.png')}
                                    style={styles.icon}
                                />
                                <Text style={{ marginTop: 15}}>GBR GALERI</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>   
                </View>
                 

            </View>
        );
    }
}

const styles = StyleSheet.create({

    fontHeader:{
        color: 'white', 
        fontSize: 30, 
        fontFamily: "Roboto"
    },

    fontSubHeader:{
        color: 'white', 
        fontSize: 16, 
        fontFamily: "Roboto"
    },

    imgBackground:{
        height: 250, 
        alignItems: "center"
    },

    icon: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
    },

    imgLogo :{
        marginTop: 20,
        resizeMode: 'stretch',
        height: 120, 
        width: 120
    }
});