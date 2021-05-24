import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

// page test
import footer from './screen/test/footer';

import dashboard from './screen/dashboard/dashboard';
import registrasi from './screen/registrasi/registrasi';
import user_list from './screen/user/user_list';
import user_ae from './screen/user/user_ae';
import galeri_list from './screen/galeri/galeri_list';
import galeri_ae from './screen/galeri/galeri_ae';
import maps from './screen/maps/maps';
import login from './screen/login/login';
import sqlite_list from './screen/sqlite/sqlite_list';

const Stack = createStackNavigator();

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#ff8303',
        accent: '#ff8303',
        text: "#1b1a17",
    },
};

function App() {
    return (
        <MenuProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="login"
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        {/* for testing */}
                        <Stack.Screen name="footer" component={ footer } />
                        
                        {/* page form */}
                        <Stack.Screen name="dashboard" component={ dashboard } />
                        <Stack.Screen name="registrasi" component={ registrasi } />
                        <Stack.Screen name="user_list" component={ user_list } />
                        <Stack.Screen name="user_ae" component={ user_ae } />
                        <Stack.Screen name="galeri_list" component={ galeri_list } />
                        <Stack.Screen name="galeri_ae" component={ galeri_ae } />
                        <Stack.Screen name="maps" component={ maps } />
                        <Stack.Screen name="login" component={ login } />
                        <Stack.Screen name="sqlite_list" component={ sqlite_list } />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </MenuProvider>
    );
}

export default App;