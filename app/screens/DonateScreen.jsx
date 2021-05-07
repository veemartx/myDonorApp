//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'
import qs from 'qs'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
const DonateComponent = () => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [centers, setCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState("Center")
    const [user, setUser] = useState({});
    const [latestAppointment, setLatestAppointment] = useState({});




    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    const getLatestAppointment = () => {

        axios.post('http://192.168.100.5/projects/myDonor/app/getLatestAppointment.php', qs.stringify(user))

            .then(function (response) {

                let res = response['data'];

                setLatestAppointment(res);

                console.log(res);

            })

            .catch((err) => {

                console.log(err);
            })


    }


    const createAppointment = () => {

        // get the details 
        let appointmentDetails = {
            userId: user.tkn,
            center: selectedCenter,
            dateTime: date,
        }


        axios.post('http://192.168.100.5/projects/myDonor/app/createAppointment.php', qs.stringify(appointmentDetails))

            .then(function (response) {

                let res = response['data'];

                // console.log(res);

                // alert(res);
                Alert.alert(
                    "Appointment Creator Wizard",
                    res,
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );

            })

            .catch((err) => {

                console.log(err);
            })
    }


    const cancelAppointment = () => {

        console.log(cancelAppointment);
    }


    useEffect(() => {

        getData().then((user) => {

            setUser(user);

        })


        // get the centers 
        axios.post('http://192.168.100.5/projects/myDonor/app/getCenters.php')

            .then(function (response) {

                let res = response['data'];

                // console.log(res);

                setCenters(res);

            })

            .catch((err) => {

                console.log(err);
            })

    }, [])


    // console.log(centers);

    return (
        <View style={styles.container}>

            <View style={styles.topBar}>
                <Text style={styles.punchline}>
                    Donate Now Save Lives
                </Text>

                <Icon
                    name="heart"
                    size={20}
                    color="#b53e44"
                    type="font-awesome"

                />
            </View>

            <View style={styles.myAppointments}>
                <Text style={styles.myAppointmentsTitle}>
                    Recent Appointment
                </Text>


                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 15 }}>
                        Center : {latestAppointment.center}
                    </Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 15 }}>
                        App. Code : {latestAppointment.code}
                    </Text>
                </View>

                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 15 }}>
                        App. Date : {latestAppointment.date}
                    </Text>
                </View>


                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 15 }}>
                        Created At: {latestAppointment.created}
                    </Text>
                </View>



                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 15 }}>
                        App. Status: {latestAppointment.status}
                    </Text>
                </View>


                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                    <Button
                        onPress={cancelAppointment}
                        // type="clear"
                        title=" Cancel Appointment"
                        buttonStyle={{ backgroundColor: 'crimson' }}

                    />

                </View>


                <View style={{ alignItems: 'center',paddingTop:10 }}>
                    <Button
                        onPress={getLatestAppointment}
                        type="clear"
                        title=" Load Appointment"

                        icon={<Icon
                            name="refresh"
                            size={14}
                            color="dodgerblue"
                            type="font-awesome"

                        />}

                    />

                </View>
            </View>


            <View style={styles.createAppointment}>
                <Text style={styles.myAppointmentsTitle}>
                    Create Donation Appointment
                </Text>



                <View>
                    <Text style={{ paddingTop: 10, color: "rgb(10,10,10)" }}>
                        Select Donation Location
                    </Text>
                    <Picker
                        selectedValue={selectedCenter}
                        style={{ color: 'gray', height: 30, width: '100%' }}
                        mode='dropdown'
                        onValueChange={(val) => {
                            setSelectedCenter(val);
                        }}

                    >
                        {centers.map((item, index) => {
                            return (< Picker.Item label={item} value={item} key={index} />);
                        })}


                    </Picker>
                </View>


                <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                    <View style={{ flex: 1, margin: 10 }}>
                        <Button

                            onPress={showDatepicker}
                            title=" Select Date"
                            type="clear"
                            icon={<Icon
                                name="calendar"
                                size={14}
                                color="dodgerblue"
                                type="font-awesome"

                            />} />
                    </View>

                    <View style={{ flex: 1, margin: 10 }}>
                        <Button
                            onPress={showTimepicker}
                            type="clear"
                            title=" Select Time"

                            icon={<Icon
                                name="history"
                                size={14}
                                color="dodgerblue"
                                type="font-awesome"

                            />}

                        />
                    </View>
                </View>


                <View style={{ alignItems: 'center' }}>
                    <Button
                        onPress={createAppointment}
                        type="clear"
                        title=" Create Appointment"

                        icon={<Icon
                            name="send"
                            size={14}
                            color="dodgerblue"
                            type="font-awesome"

                        />}

                    />

                </View>


            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};



// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    topBar: {
        backgroundColor: 'rgba(255,0,0,0.1)',
        height: 140,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    punchline: {
        fontSize: 22,
        color: '#b53e44',
        fontWeight: 'bold'
    },

    myAppointments: {
        height: 270,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '95%',
        margin: 10,
        borderRadius: 10,
        padding: 10
    },

    myAppointmentsTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'rgb(118,10,10)',
        textDecorationLine: 'underline'
    },

    createAppointment: {
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '95%',
        margin: 10,
        borderRadius: 10,
        padding: 10
    }
});

//make this component available to the app
export default DonateComponent;
