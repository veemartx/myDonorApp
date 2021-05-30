import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import authStack from './authStack'
import profileStack from './profileStack'
import AppContext from '../providers/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';






const Stack = createStackNavigator();

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@liu')

        return jsonValue != null ? JSON.parse(jsonValue) : null;

    } catch (e) {
        // error reading value
        console.log(e)
    }
}




const AccountStack = ({ navigation }) => {

    const myContext = useContext(AppContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Screen was focused
            // console.log('focused');

            // console.log(myContext);

            getData().then((va) => {

                console.log(va);

                
                // console.log(va)
                if (va.logged_in === true) {

                    setIsLoggedIn(true);
                }

            })
        });

        return unsubscribe;
    }, [navigation]);


    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            {isLoggedIn === true ?

                <Stack.Screen name="Profile" component={profileStack} options={{ title: "Profile" }} /> :
                <Stack.Screen name="Auth" component={authStack} options={{ title: "Auth" }} />

            }



        </Stack.Navigator>
    );
}



export default AccountStack;


const styles = StyleSheet.create({


})