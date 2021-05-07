import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AppealsHome from '../screens/AppealsScreen'





const Stack = createStackNavigator();


const RequestsStack = ({ navigation }) => {


    return (


        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >

            <Stack.Screen
                name="Login"
                // options={hea}
                options={{ title: 'Appeals (Requests)' }}
                component={AppealsHome}
            />



        </Stack.Navigator>
    );
}



export default RequestsStack;


const styles = StyleSheet.create({

})