import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileScreen from '../screens/ProfileScreen'
import AppContext from '../providers/AppContext'





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


const profileStack = ({ navigation }) => {

    const [loggedIn, setloggedIn] = useState(getData());

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const myContext = useContext(AppContext);


    if (myContext.user.logged_in == true) {

        setIsLoggedIn(true);

    }


    return (


        
        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >

            <Stack.Screen
                name="Profile"
                // options={hea}
                options={{ title: 'Profile' }}
                component={profileScreen}
            />

          

        </Stack.Navigator>
    );
}



export default profileStack;


const styles = StyleSheet.create({

})