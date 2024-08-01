import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import GusetLoginScreen from '../screens/GusetLoginScreen';


export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    Guest: undefined;
}

const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {

    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Signup"component={SignupScreen} options={{headerTitle:'',headerTransparent: true, headerTintColor: '#fff',}} />
            <Stack.Screen name="Guest" component={GusetLoginScreen} options={{headerTitle:'',headerTransparent: true, headerTintColor: '#fff',}}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;