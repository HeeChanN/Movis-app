import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainScreen from '../screens/MainScreen';
import TmpScreen from '../screens/TmpScreen';



export type MainStackParamList = {
    Home: undefined,
    good: undefined
}

const Stack = createStackNavigator<MainStackParamList>();

function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={MainScreen} options={{headerShown: false}}/>
            <Stack.Screen name='good' component={TmpScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
  
}

const styles = StyleSheet.create({});

export default MainStackNavigator;