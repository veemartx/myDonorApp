import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SettingsHome from '../screens/SettingsScreen'



const Stack = createStackNavigator();


const SettingStack = ({ navigation }) => {


    return (


        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >

            <Stack.Screen
                name="DonationsHome"
                // options={hea}
                options={{ title: 'Settings' }}
                component={SettingsHome}
            />



        </Stack.Navigator>
    );
}



export default SettingStack;


const styles = StyleSheet.create({

})