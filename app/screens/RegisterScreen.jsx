import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View, StatusBar, Alert, ToastAndroid } from 'react-native';
// import from react native elements 
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, CheckBox } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import qs from 'qs'
import AppContext from '../providers/AppContext'
import { Picker } from '@react-native-picker/picker';




// get the radio button
import RadioButton from '../components/RadioButton'

const input = React.createRef();


const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@liu', jsonValue)

        // console.log('stored');

    } catch (e) {
        // saving error
    }
}


const ValidateEmail = (inputText) => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
        // alert("Valid email address!");
        return true;
    } else {

        return false;
    }

}

const RegisterComponent = ({ navigation }) => {

    const handleForgotPassword = () => {

        WebBrowser.openBrowserAsync('https://patadose.co.ke/account/forgot-password');
    }

    const [isLoading, setisLoading] = useState(false)

    // set the state for gender radio button 
    const [gender, setGender] = useState("Select Gender");

    const myContext = useContext(AppContext);

    const [selectedCounty, setSelectedCounty] = useState();


    const PROP = [
        {
            key: 'Male',
            text: 'Male',
        },
        {
            key: 'Female',
            text: 'Female',
        }
        ,
        {
            key: 'Other',
            text: 'Other',
        }

    ];


    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');


    function handleChange(newValue) {
        setSex(newValue);
        // console.log(newValue);

    }

    const handleFormSubmit = (navigation) => {

        let formData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            password: password,
            gender: sex,
            consfirmPassword: confirmPassword
        }

        if (password != confirmPassword) {

            ToastAndroid.show('Passwords Do Not Match', ToastAndroid.SHORT);

        } else {

            setisLoading(true);

            axios.post('https://patadose.co.ke/app/createAccount.php', qs.stringify(formData))

                .then(function (response) {

                    // console.log(response['data']);

                    let res = response['data'];


                    ToastAndroid.show(res.message, ToastAndroid.SHORT);


                    if (res.success === true) {

                        storeData({ logged_in: true, tkn: res.c_id }).then(() => {

                            // navigation.navigate('Home');
                            myContext.setUser({ logged_in: true, tkn: res.c_id });

                            console.log({ logged_in: true, tkn: res.c_id })

                        });
                    }

                    setisLoading(false);

                })
        }
    }


    return (

        <View style={styles.container}>
            <ScrollView >

                <View style={styles.formContainer}>

                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: 'https://vilwave.com/mydonor/favcon.png' }}
                            style={{ width: 120, height: 100 }}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </View>


                    <Input
                        placeholder="First Name"
                        ref={input}
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={24}
                                color='gray'
                            />
                        }


                        onChangeText={(val) => { setfirstName(val) }}
                    />

                    <Input
                        placeholder="Last Name"
                        leftIcon={
                            <Icon
                                name='user-o'
                                size={24}
                                color='gray'
                            />
                        }

                        onChangeText={(val) => { setlastName(val) }}
                    />


                    <Input

                        placeholder="Email Address"
                        // errorMessage="Enter a valid email address"
                        ref={input}
                        leftIcon={
                            <Icon
                                name='envelope-o'
                                size={24}
                                color='gray'
                            />
                        }


                        onChangeText={(val) => {

                            setEmail(val);

                        }}
                    />

                    <Input

                        placeholder="Phone Number"
                        keyboardType='phone-pad'
                        leftIcon={
                            <Icon
                                name='phone'
                                size={24}
                                color='gray'
                            />
                        }

                        onChangeText={(val) => { setPhone(val) }}

                    />



                    <RadioButton PROP={PROP} onChange={handleChange} />


                    <Input
                        placeholder="Your Weight (Kgs)"
                        secureTextEntry={true}
                        leftIcon={
                            <Icon
                                name='balance-scale'
                                type='font-awesome'
                                size={24}
                                color='gray'
                            />
                        }

                        onChangeText={(val) => { setPassword(val) }}
                        keyboardType='number-pad'

                    />


                    <Input
                        placeholder="Your Height (Cm)"
                        secureTextEntry={true}
                        leftIcon={
                            <Icon
                                name='square'
                                type='font-awesome'
                                size={24}
                                color='gray'
                            />
                        }

                        onChangeText={(val) => { setconfirmPassword(val) }}

                        keyboardType='number-pad'
                    />



                    <View style={{height:50,backgroundColor:'red'}}>

                        <Picker
                            selectedValue={selectedCounty}
                            style={{ backgroundColor: 'rgba(0,0,0,1)' }}
                            height={30}
                            onValueChange={()=>{

                                console.log('data')
                            }}
                        // mode='dropdown'
                        >
                            <Picker.Item label="Select County" />
                            <Picker.Item label='Baringo' value='Baringo' />
                            <Picker.Item label='Bomet' value='Bomet' />
                            <Picker.Item label='Bungoma' value='Bungoma' />
                            <Picker.Item label='Busia' value='Busia' />
                            <Picker.Item label='Elgeyo Marakwet' value='Elgeyo-Marakwet' />
                            <Picker.Item label='Embu' value='Embu' />
                            <Picker.Item label='Garissa' value='Garissa' />
                            <Picker.Item label='Homa Bay' value='Homa Bay' />
                            <Picker.Item label='Isiolo' value='Isiolo' />
                            <Picker.Item label='Kajiado' value='Kajiado' />
                            <Picker.Item label='Kakamega' value='Kakamega' />
                            <Picker.Item label='Kericho' value='Kericho' />
                            <Picker.Item label='Kiambu' value='Kiambu' />
                            <Picker.Item label='Kilifi' value='Kilifi' />
                            <Picker.Item label='Kirinyaga' value='Kirinyaga' />
                            <Picker.Item label='Kisii' value='Kisii' />
                            <Picker.Item label='Kisumu' value='Kisumu' />
                            <Picker.Item label='Kitui' value='Kitui' />
                            <Picker.Item label='Kwale' value='Kwale' />
                            <Picker.Item label='Laikipia' value='Laikipia' />
                            <Picker.Item label='Lamu' value='Lamu' />
                            <Picker.Item label='Machakos' value='Machakos' />
                            <Picker.Item label='Makueni' value='Makueni ' />
                            <Picker.Item label='Mandera' value='Mandera' />
                            <Picker.Item label='Marsabit' value='Marsabit' />
                            <Picker.Item label='Meru' value='Meru' />
                            <Picker.Item label='Migori' value='Migori' />
                            <Picker.Item label='Mombasa' value='Mombasa' />
                            <Picker.Item label="Murang'a" value="Murang'a" />
                            <Picker.Item label='Nairobi' value='Nairobi City' />
                            <Picker.Item label='Nakuru' value='Nakuru' />
                            <Picker.Item label='Nandi' value='Nandi' />
                            <Picker.Item label='Narok' value='Narok' />
                            <Picker.Item label='Nyamira' value='Nyamira' />
                            <Picker.Item label='Nyandarua' value='Nyandarua' />
                            <Picker.Item label='Nyeri' value="Nyeri" />
                            <Picker.Item label='Samburu' value='Samburu' />
                            <Picker.Item label='Siaya' value='Siaya' />
                            <Picker.Item label='Taita-Taveta' value='Taita-Taveta' />
                            <Picker.Item label='Tana River' value='Tana River' />
                            <Picker.Item label='Tharaka-Nithi' value='Tharaka-Nithi' />
                            <Picker.Item label='Trans Nzoia' value='Trans Nzoia' />
                            <Picker.Item label='Turkana' value='Turkana' />
                            <Picker.Item label='Uasin Gishu' value='Uasin Gishu' />
                            <Picker.Item label='Vihiga' value='Vihiga' />
                            <Picker.Item label='West Pokot' value='West Pokot' />
                            <Picker.Item label='wajir' value='wajir' />
                  
                        </Picker>
                    </View>

                    <Input
                        placeholder="Your Password"
                        secureTextEntry={true}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='gray'
                            />
                        }

                        onChangeText={(val) => { setPassword(val) }}


                    />

                    <Input
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='gray'
                            />
                        }

                        onChangeText={(val) => { setconfirmPassword(val) }}

                    />





                    <View style={styles.buttonContainer}>
                        <Button
                            title=" REGISTER"
                            loading={isLoading}
                            type="solid"
                            raised
                            buttonStyle={{ backgroundColor: 'crimson' }}
                            onPress={() => {
                                handleFormSubmit(navigation)
                            }}
                            icon={
                                <Icon
                                    name="lock"
                                    size={15}
                                    color="#fff"
                                />
                            }

                        />
                    </View>



                    <View style={styles.createAccountButtonContainer}>
                        <Button
                            title="Have An Account? Login Here"
                            type="clear"
                            // raised
                            onPress={() => {
                                navigation.goBack();
                            }}

                        />
                    </View>
                </View>


                <View style={{ flex: 1 }}>

                </View>

            </ScrollView>
        </View>

    );
}

export default RegisterComponent;


StatusBar.setBarStyle('dark-content');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        height: 50,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 60,
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


    forgotPasswordContainer: {
        flex: 1,
        // backgroundColor: 'teal'
    },

    createAccountButtonContainer: {
        // backgroundColor: "red",
        marginTop: 70,
        marginBottom: 30,
        height: 30,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }

});
