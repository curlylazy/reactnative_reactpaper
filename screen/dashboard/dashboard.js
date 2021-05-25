import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image, Text, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid';

// style
import css from '../../style/styles';
import Session from "../../app/session";

export default class dashboard extends Component {

    constructor(props) {
        super(props);
        this.session =  new Session();
        this.state = {
            katakunci: '',
            person: []
        };
    }

    // FUNCTION ============================
    async componentDidMount() {
        var isLogin = null;
        await this.session.cekSessionIsLogin().then(row => isLogin = row);
        if(!isLogin)
        {
            this.props.navigation.navigate('login');
        }
        console.log("isLogin : " + isLogin);
    }

    logoutClick = async () => {
        await this.session.clearSession();
        this.props.navigation.navigate('login');
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
                                <Text style={styles.fontMenu}>REGISTRASI</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col sm={4} style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('user_list')}>
                                <Image
                                    source={require('../../img/daftaritem.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>DAFTAR USER</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col sm={4} style={{ alignItems: 'center' }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('footer')}>
                                <Image
                                    source={require('../../img/daftaritem.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>FOOTER TEXT</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={4} style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('galeri_list')}>
                                <Image
                                    source={require('../../img/galeri.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>GBR GALERI</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={4} style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('maps')}>
                                <Image
                                    source={require('../../img/map.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>MAPS</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={4} style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('login')}>
                                <Image
                                    source={require('../../img/login.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>LOGIN</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={4} style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('sqlite_list')}>
                                <Image
                                    source={require('../../img/database.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>SQLite</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={4} style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('gpspage')}>
                                <Image
                                    source={require('../../img/gps.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>GPS</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col sm={4} style={{ alignItems: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={ () => this.logoutClick()}>
                                <Image
                                    source={require('../../img/signout.png')}
                                    style={styles.icon}
                                />
                                <Text style={styles.fontMenu}>Keluar</Text>
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

    fontMenu:{
        marginTop: 15, 
        textAlign: 'center'
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