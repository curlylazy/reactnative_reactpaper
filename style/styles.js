'use strict';
import { StyleSheet, Platform, StatusBar } from 'react-native';

export default StyleSheet.create({
    
    footer_pageinfo: {
        justifyContent: 'center', 
        alignItems: 'center'
    },

    footer: {
        height: 60, 
        backgroundColor: 'gray'
    },

    droidSafeArea: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
});

// module.exports = StyleSheet.create({

//     footer_pageinfo: {
//         justifyContent: 'center', 
//         alignItems: 'center'
//     },

//     footer: {
//         height: 60, 
//         backgroundColor: 'gray'
//     }
// });