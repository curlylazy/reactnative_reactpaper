import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

import dashboard from './screen/dashboard/dashboard';
import registrasi from './screen/registrasi/registrasi';
import user_list from './screen/user/user_list';
import user_ae from './screen/user/user_ae';

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
                        initialRouteName="user_list"
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen name="dashboard" component={ dashboard } />
                        <Stack.Screen name="registrasi" component={ registrasi } />
                        <Stack.Screen name="user_list" component={ user_list } />
                        <Stack.Screen name="user_ae" component={ user_ae } />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </MenuProvider>
    );
}

export default App;