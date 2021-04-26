import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginComponent from '../screens/LoginScreen'
import RegisterComponent from '../screens/RegisterScreen'
import ForgotPassComponent from '../screens/ForgotPassScreen'




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




const AuthComponent = ({ navigation }) => {

    const [loggedIn, setloggedIn] = useState(getData());

    loggedIn.then((tkn) => {

        if (tkn == null) {
            // storeData({logged_in:false,tkn:uuidv4()});
        } else {

            // console.log(tkn);
        }

    })


    return (

        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >
            <Stack.Screen
                name="Login"
                // options={hea}
                options={{ title: 'MyDonor Login' }}
                component={LoginComponent }
            />

            <Stack.Screen
                name="Register"
                options={{ title: 'Register' }}
                component={RegisterComponent}
            />

            <Stack.Screen
                name="ForgotPass"
                options={{ title: 'Forgot Password' }}
                component={ForgotPassComponent}
            />

        </Stack.Navigator>
    );
}



export default AuthComponent;


const styles = StyleSheet.create({

})