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
const HomeComponent = ({ navigation }) => {

    const [user, setUser] = useState({});



    // use effect to get the data 
    useEffect(() => {

        getData().then((liu) => {

            if (liu == undefined) {

                // navgate to login 
                navigation.navigate('Profile');
            }


            axios.post(baseUrl + 'getUser.php', qs.stringify(liu))

                .then(function (response) {

                    let res = response['data'];

                    // alert(liu);

                    console.log(res);

                    setUser(res);

                })

                .catch((err) => {

                    console.log(err);
                })
        })

    }, [])



    return (
        <View style={styles.container}>
            <View style={styles.topBar}>

                <View style={styles.avatorContainer}>

                    {user.gender == 'M' ? <Image
                        // style={styles.stretch}
                        source={require('../assets/images/male.png')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode='center'
                    /> :

                        <Image
                            // style={styles.stretch}
                            source={require('../assets/images/avator.png')}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode='center'
                        />
                    }



                </View>

                <Text style={{ color: 'gray', paddingTop: 10 }}>
                    Welcome Back
                </Text>

                <Text style={styles.userName}>
                    {user.name}
                </Text>
            </View>

            <View style={styles.statsBar}>


                {/* stats panel  */}

                <View style={styles.statPanel}>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10 }}>

                        <View style={{ flex: 6 }}>
                            <Text style={styles.statsTitleText}>
                                Total Donations
                            </Text>
                        </View>


                        <View style={{ flex: 1 }}>
                            <Icon
                                name='square'
                                size={15}
                                color='orangered'
                                type='font-awesome'
                            />
                        </View>

                    </View>

                    <Text style={styles.statsFigText}>
                        {user.totalDonations}
                    </Text>


                    <View style={{ backgroundColor: 'orangered', width: '100%', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ flex: 5, paddingHorizontal: 10 }}>
                            <Text style={{ color: 'aliceblue', fontWeight: 'bold' }}>
                                Donations Today
                            </Text>
                        </View>

                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'right', paddingHorizontal: 10, color: 'aliceblue', fontWeight: 'bold' }}>
                                {user.donationsToday}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* stats pane  */}



                {/* stats panel  */}

                <View style={styles.statPanel}>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10 }}>

                        <View style={{ flex: 6 }}>
                            <Text style={styles.statsTitleText}>
                                Total Requests
                            </Text>
                        </View>


                        <View style={{ flex: 1 }}>
                            <Icon
                                name='square'
                                size={15}
                                color='purple'
                                type='font-awesome'
                            />
                        </View>

                    </View>

                    <Text style={styles.statsFigText}>
                        {user.totalRequests}
                    </Text>


                    <View style={{ backgroundColor: 'purple', width: '100%', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ flex: 5, paddingHorizontal: 10 }}>
                            <Text style={{ color: 'aliceblue', fontWeight: 'bold' }}>
                                Requests Today
                            </Text>
                        </View>

                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'right', paddingHorizontal: 10, color: 'aliceblue', fontWeight: 'bold' }}>
                                {user.requestsToday}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* stats pane  */}




                {/* stats panel  */}

                <View style={styles.statPanel}>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10 }}>

                        <View style={{ flex: 6 }}>
                            <Text style={styles.statsTitleText}>
                                My Donations
                            </Text>
                        </View>


                        <View style={{ flex: 1 }}>
                            <Icon
                                name='square'
                                size={15}
                                color='teal'
                                type='font-awesome'
                            />
                        </View>

                    </View>

                    <Text style={styles.statsFigText}>
                        {user.myDonations}
                    </Text>


                    <View style={{ backgroundColor: 'teal', width: '100%', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ flex: 5, paddingHorizontal: 10 }}>
                            <Text style={{ color: 'aliceblue', fontWeight: 'bold' }}>
                                My Donations Today
                            </Text>
                        </View>

                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'right', paddingHorizontal: 10, color: 'aliceblue', fontWeight: 'bold' }}>
                                {user.myDonationsToday}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* stats pane  */}


                {/* stats panel  */}

                <View style={styles.statPanel}>

                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10 }}>

                        <View style={{ flex: 6 }}>
                            <Text style={styles.statsTitleText}>
                                My Requests
                            </Text>
                        </View>


                        <View style={{ flex: 1 }}>
                            <Icon
                                name='square'
                                size={15}
                                color='#a36f6c'
                                type='font-awesome'
                            />
                        </View>

                    </View>

                    <Text style={styles.statsFigText}>
                        {user.myRequests}
                    </Text>


                    <View style={{ backgroundColor: '#a36f6c', width: '100%', flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }}>
                        <View style={{ flex: 5, paddingHorizontal: 10 }}>
                            <Text style={{ color: 'aliceblue', fontWeight: 'bold' }}>
                                My Requests Today
                            </Text>
                        </View>

                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: 'right', paddingHorizontal: 10, color: 'aliceblue', fontWeight: 'bold' }}>
                                {user.myRequestsToday}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* stats pane  */}
            </View>



            <View style={{ flexDirection: 'row' }}>
                <View style={styles.buttonBar}>
                    <Button
                        title=" Donate"
                        buttonStyle={{ backgroundColor: 'green' }}
                        onPress={() => {
                            navigation.navigate('Donate');
                        }}
                        icon={
                            <Icon
                                name="heart"
                                size={14}
                                color="crimson"
                                type="font-awesome"

                            />
                        }
                    />
                </View>


                <View style={styles.buttonBar}>
                    <Button
                        title=" Request"
                        buttonStyle={{ backgroundColor: 'red', textAlign: 'center' }}
                        onPress={() => {
                            navigation.navigate('Request');
                        }}
                        icon={
                            <Icon
                                name="download"
                                size={15}
                                color="aliceblue"
                                type="font-awesome"

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
        height: 170,
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
        paddingTop: 1,
        fontSize: 20,
        color: 'rgb(118,118,118)',
    },

    statsBar: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: 260,
        width: '97%',
        margin: 10,
        marginHorizontal: 80,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        padding: 10
    }

    ,
    statPanel: {
        width: '49%',
        height: 100,
        backgroundColor: '#fff',
        marginVertical: 10

    },

    statsTitleText: {
        fontSize: 14,
        color: 'gray',
        fontWeight: 'bold'
    },

    statsFigText: {
        fontSize: 27,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingBottom: 8,
        paddingTop: 4
    },

    buttonBar: {
        marginTop: 30,
        alignItems: 'center',
        flex: 1
    }


});

//make this component available to the app
export default HomeComponent;
