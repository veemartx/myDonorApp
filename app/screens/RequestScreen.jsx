//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios'
import qs from 'qs'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const RequestComponent = () => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [centers, setCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState("Center")
    const [user, setUser] = useState({});
    const [bloodType, setBloodType] =useState('');




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

        axios.post(baseUrl+'getLatestAppointment.php', qs.stringify(user))

            .then(function (response) {

                let res = response['data'];

                setLatestAppointment(res);

                console.log(res);

            })

            .catch((err) => {

                console.log(err);
            })


    }


    const createAppeal = () => {

        // get the details 
        let appointmentDetails = {
            userId: user.tkn,
            center: selectedCenter,
            dateTime: date,
            bloodType:bloodType
        }


        axios.post(baseUrl+'createAppeal.php', qs.stringify(appointmentDetails))

            .then(function (response) {

                let res = response['data'];

                // console.log(res);

                // alert(res);
                Alert.alert(
                    "Appeal Creator Wizard",
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


    const cancelAppeal = () => {

        console.log(cancelAppeal);

    }


    useEffect(() => {

        getData().then((user) => {

            setUser(user);

        })


        // get the centers 
        axios.post(baseUrl+'app/getCenters.php')

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




            <View style={styles.createAppeal}>
                <Text style={styles.myAppointmentsTitle}>
                    Create Donation Appeal
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



                <View style={{paddingTop:10}}>

                    <Text style={{ color: 'black' }}>
                       Select Blood Type
                    </Text>

                    <Picker
                        selectedValue={bloodType}
                        style={{ color: 'gray', height: 30, width: '100%' }}
                        mode='dropdown'
                        onValueChange={(val) => {

                            console.log(val);
                            setBloodType(val);
                        }}

                    >

                        <Picker.Item label='A-' value='A-' />
                        <Picker.Item label='A+' value='A+' />
                        <Picker.Item label='B-' value='B-' />
                        <Picker.Item label='B+' value='B+' />
                        <Picker.Item label='O-' value='O-' />
                        <Picker.Item label='O+' value='o+' />
                        <Picker.Item label='AB-' value='AB-' />
                        <Picker.Item label='AB+' value='AB+' />


                    </Picker>
                </View>





                <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                    <View style={{ flex: 1, margin: 10 }}>
                        <Button

                            onPress={showDatepicker}
                            title=" Select Due Date"
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
                        onPress={createAppeal}
                        type="clear"
                        title=" Create Appeal"

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
    createAppeal: {
        height: 290,
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '95%',
        margin: 10,
        borderRadius: 10,
        padding: 10
    }
});

//make this component available to the app
export default RequestComponent;
