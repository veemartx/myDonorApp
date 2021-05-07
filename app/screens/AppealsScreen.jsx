//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios'
import qs from 'qs'

// create a component
const AppealsHome = () => {

    const [appeals, setAppeals] = useState([]);



    useEffect(() => {

        // get the appeasl 
        axios.post('http://192.168.100.5/projects/myDonor/app/getAppeals.php')

            .then(function (response) {

                let res = response['data'];


                setAppeals(res);

            })

            .catch((err) => {

                console.log(err);
            })


    }, [])


    return (
        <View style={styles.container}>
       
            <FlatList
                style={{ flex: 1 }}
                data={appeals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.appealCard}
                            onPress={() => { console.log('appeal') }}
                        >
                            <View style={styles.textContainer}>
                                <Text style={styles.appealCodeText}>
                                    Appeal Code:  {item.code}
                                </Text>
                                <Text style={styles.centerText}>
                                    Donation Center: {item.center}
                                </Text>

                                <Text style={styles.userText}>
                                    Appeal By:  {item.user}
                                </Text>

                                <Text style={styles.orderDateText}>
                                    Blood Type:  {item.bloodType}
                                </Text>

                                <Text style={styles.d}>
                                    Due Date: {item.dueDate}
                                </Text>

                                <Text style={{paddingTop:5,fontSize:12,color:'gray'}}>
                                    Created At: {item.created}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    );
};





// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f2f2f2',

    },

    appealCard: {
        height: 130,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(118,118,118,.1)',
        borderRadius: 10,
        flexDirection: 'row'
    },
    appealCodeText: {
        fontWeight: 'bold',
        paddingBottom: 5
    },
    centerText: {

    }
});

//make this component available to the app
export default AppealsHome;
