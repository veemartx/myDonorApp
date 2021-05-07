//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const DonationsHome = () => {
    return (
        <View style={styles.container}>
            <Text>DonationsHome</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        
    },
});

//make this component available to the app
export default DonationsHome;
