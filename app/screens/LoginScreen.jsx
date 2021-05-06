import React, { useState, useContext } from 'react';
import { StyleSheet, View, StatusBar, Text, Alert } from 'react-native';
// import from react native elements 
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, CheckBox } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import qs from 'qs'
import AppContext from '../providers/AppContext'




const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@liu', jsonValue)
    } catch (e) {
        // saving error
    }
}



// get data

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@liu')
        // return jsonValue != null ? JSON.parse(jsonValue) : null;
        if (jsonValue != null) {

            let data = JSON.parse(jsonValue);

            return data;
        }
    } catch (e) {
        // error reading value
    }
}




const LoginComponent = ({ navigation }) => {


    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [isLoading, setisLoading] = useState(false)

    const myContext = useContext(AppContext);



    // console.log(myContext)

    
    const handleLogin = (navigation) => {

        let formData = {
            email: email,
            password: password,
            tempUser: myContext.user.tkn
        }

        // console.log(formData);
        setisLoading(true);

        axios.post('http://192.168.100.5/projects/myDonor/app/login.php', qs.stringify(formData))

            .then(function (response) {

                // console.log(response['data']);

                let res = response['data'];

                if (res.login === true) {

                    let lgu = {
                        logged_in: true,
                        tkn: res.userId
                    }

                    // store then read 
                    storeData(lgu).then(() => {

                        // read the data 
                        getData().then((loggedIn) => {

                            // console.log(loggedIn);

                            myContext.setUser(lgu);

                        })
                    })



                } else {
                    Alert.alert(
                        "Login",
                        res.message
                    )
                }

                setisLoading(false);

            })
    }

    return (

        <View style={styles.container}>

            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://vilwave.com/mydonor/favcon.png' }}
                        style={{ width: 120, height: 100 }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>


                <Input
                    label="Email"
                    placeholder="example@gmail.com"
                    onChangeText={(val) => {
                        // console.log(val);
                        setEmail(val);
                    }}

                    leftIcon={
                        <Icon
                            name='envelope-o'
                            size={24}
                            color='gray'
                        />
                    }
                />

                <Input
                    placeholder="Your Password"
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={(val) => {
                        // console.log(val);
                        setPassword(val);
                    }}
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='gray'
                        />
                    }
                />

                <View style={styles.buttonContainer}>
                    <Button
                        title=" MYDONOR LOGIN"
                        type="solid"
                        loading={isLoading}
                        raised
                        buttonStyle={{ backgroundColor: 'crimson' }}
                        onPress={handleLogin}
                        icon={
                            <Icon
                                name="lock"
                                size={15}
                                color="#fff"
                            />
                        }

                    />
                </View>


                <View style={styles.forgotPassBar}>
                    <View style={styles.rememberMeContainer}>
                        {/* <CheckBox
                            title='Remember Me'
                        // checked={this.state.checked}
                        /> */}
                    </View>

                    <View style={styles.forgotPasswordContainer}>
                        <Text
                            style={{ fontWeight: 'bold', color: 'gray', textAlign: 'center', fontSize: 15, paddingTop: 20 }}
                            onPress={()=>{
                                navigation.navigate('ForgotPass')
                            }}
                        >
                            Forgot Password ?
            </Text>
                    </View>

                </View>

                <View style={styles.createAccountButtonContainer}>
                    <Button
                        title=" CREATE ACCOUNT"
                        type="outline"
                        // raised
                        onPress={() => { navigation.navigate('Register') }}
                    />
                </View>
            </View>


            <View style={{ flex: 1 }}>

            </View>

        </View>
    );
}

export default LoginComponent;


StatusBar.setBarStyle('dark-content');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    formContainer: {
        flex: 8,
        padding: 20
    },
    backContainer: {
        height: 50,
        width: 60,
        alignItems: 'flex-start',
        justifyContent: "center",
        padding: 20

    },
    logoContainer: {
        height: 70,
        width: 140,
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 100,
        paddingTop: 20

    },
    topBar: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },

    buttonContainer: {
        // backgroundColor: "orange",
        marginTop: 20,
        height: 30,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPassBar: {
        // backgroundColor: "orange",
        marginTop: 20,
        height: 50,
        flexDirection: 'row'

    },
    rememberMeContainer: {
        flex: 1,
        // backgroundColor: 'tomato'
    },

    forgotPasswordContainer: {
        flex: 1,
        // backgroundColor: 'teal'
    },

    createAccountButtonContainer: {
        // backgroundColor: "red",
        marginTop: 70,
        height: 30,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }



});
