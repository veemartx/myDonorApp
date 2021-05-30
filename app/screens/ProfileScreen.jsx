//import liraries
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image, Icon, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import qs from 'qs'
import baseUrl from '../providers/AppConfig';




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




// create a component
const ProfileComponet = () => {

    const [user, setUser] = useState({});



    const  handleLogout = async () => {

        // console.log('logout init');

        // remove the sata  
        try {
            await AsyncStorage.removeItem('@liu');

            alert('logout');

            
            return true;
        }
        catch (exception) {
            return false;
        }

    }


    // use effect to get the data 
    useEffect(() => {

        getData().then((liu) => {

            axios.post(baseUrl + 'getUser.php', qs.stringify(liu))

                .then(function (response) {

                    let res = response['data'];

                    // console.log(res);

                    setUser(res);


                })

                .catch((err) => {

                    console.log(err);
                })
        })

    }, [user])



    return (
        <View style={styles.container}>
            <View style={styles.topBar}>

                <View style={styles.avatorContainer}>

                    <Image
                        // style={styles.stretch}
                        source={require('../assets/images/avator.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='center'
                    />

                </View>

                <Text style={styles.userName}>
                    {user.name}
                </Text>
            </View>


            <View style={styles.middleBar}>

                <View style={styles.detCol}>
                    <View style={styles.iconBox}>
                        <Icon
                            name='user-o'
                            size={24}
                            color='gray'
                            type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.name}
                        </Text>
                    </View>
                </View>


                <View style={styles.detCol}>
                    <View style={styles.iconBox}>
                        <Icon
                            name='envelope-o'
                            size={24}
                            color='gray'
                            type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.email}
                        </Text>
                    </View>
                </View>



                <View style={styles.detCol}>
                    <View style={styles.iconBox}>
                        <Icon
                            name='phone'
                            size={24}
                            color='gray'
                            type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.phone}
                        </Text>
                    </View>
                </View>


                <View style={styles.detCol}>
                    <View style={styles.iconBox}>
                        <Icon
                            name='house'
                            size={24}
                            color='gray'
                        // type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.town}
                        </Text>
                    </View>
                </View>

                <View style={styles.detCol}>
                    <View style={styles.iconBox}>
                        <Icon
                            name='map-marker'
                            size={24}
                            color='gray'
                            type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.county} County
                        </Text>
                    </View>
                </View>



                <View style={[styles.detCol]}>
                    <View style={styles.iconBox}>
                        <Icon
                            name='venus-mars'
                            size={24}
                            color='gray'
                            type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.gender}
                        </Text>
                    </View>



                    <View style={styles.iconBox}>
                        <Icon
                            name='square'
                            size={24}
                            color='gray'
                            type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.height} Cm
                        </Text>
                    </View>



                    <View style={styles.iconBox}>
                        <Icon
                            name='balance-scale'
                            size={24}
                            color='gray'
                            type='font-awesome'
                        />
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.text}>
                            {user.weight} Kg
                        </Text>
                    </View>
                </View>




                <View style={styles.buttonContainer}>
                    <Button
                        title="LOGOUT"
                        loading={false}
                        type='clear'
                        raised
                        onPress={() => {
                            handleLogout()
                        }}
                        icon={
                            <Icon
                                name="power"
                                size={15}
                                color="dodgerblue"
                            />
                        }

                    />
                </View>




            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },


    topBar: {
        paddingTop: 10,
        height: 160,
        backgroundColor: 'rgba(186, 91, 80,0.1)',
        width: '100%',
        textAlign: 'center',
        alignItems: 'center'
    },
    avatorContainer: {
        width: 100,
        height: 100,
        backgroundColor: "rgba(255,255,255,.2)",
        borderRadius: 50
    },

    userName: {

        fontWeight: 'bold',
        padding: 10,
        fontSize: 20,
        color: 'rgb(118,118,118)',
    },

    middleBar: {
        height: 250,
        width: '100%',
        marginTop: 10,
        paddingTop: 10,
    },

    detCol: {

        height: 50,
        width: '100%',
        marginTop: 5,
        elevation: 1,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',


    },
    iconBox: {
        flex: 2,
    },

    textBox: {

        flex: 4,
        textAlign: 'left'
    },

    text: {
        fontSize: 16,
        color: "gray",
        paddingTop: 2,
        // fontWeight:'bold'
    },

    buttonContainer: {

        marginTop: 40,
        height: 30,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
});

//make this component available to the app
export default ProfileComponet;
