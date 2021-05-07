import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import DonationsHome from '../screens/DonationsScreen'



const Stack = createStackNavigator();


const DonationsStack = ({ navigation }) => {


    return (


        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >

            <Stack.Screen
                name="DonationsHome"
                // options={hea}
                options={{ title: 'Donations' }}
                component={DonationsHome}
            />



        </Stack.Navigator>
    );
}



export default DonationsStack;


const styles = StyleSheet.create({

})