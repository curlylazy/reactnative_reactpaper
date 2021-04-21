import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import dashboard from './screen/dashboard/dashboard';
import registrasi from './screen/registrasi/registrasi';

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
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="dashboard" component={ dashboard } />
                    <Stack.Screen name="registrasi" component={ registrasi } />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export default App;