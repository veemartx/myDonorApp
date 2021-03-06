import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen'
import RequestComponent from '../screens/RequestScreen'
import DonateComponent from '../screens/DonateScreen';



const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@liu')

        return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch (e) {
        // error reading value
        console.log(e)
    }
}



const Stack = createStackNavigator();


const AppStack = ({ navigation }) => {

    const [loggedIn, setloggedIn] = useState(getData());

    return (



        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >

            <Stack.Screen
                name="Home"
                // options={hea}
                options={{ title: 'My Donor' }}
                component={HomeScreen}
            />

            <Stack.Screen
                name="Donate"
                // options={hea}
                options={{ title: 'Donate' }}
                component={DonateComponent}
            />



            <Stack.Screen
                name="Request"
                // options={hea}
                options={{ title: 'Request' }}
                component={RequestComponent}
            />



        </Stack.Navigator>
    );
}



export default AppStack;


const styles = StyleSheet.create({

})