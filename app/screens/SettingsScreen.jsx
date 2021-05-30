//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const SettingsHome = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.whyDonateTitle}>Why Donate</Text>

            <Text style={styles.whyDonateText}>A blood donation is the most precious gift that an individual can give to others in need. In only 45-60 minutes, an eligible individual can donate one unit of blood that can be separated into four individual components that could help save multiple lives</Text>

            <Text style={styles.whyDonateTextTwo}>

                1). Donating blood regularly may lower iron stores. High body iron stores are believed to increase the risk of heart attack.
            </Text>


            <Text style={styles.whyDonateTextTwo}>

                2). People who have recovered from COVID-19 may be able to help others with the disease by donating blood plasma. Their plasma can contain antibodies to the infection. If another person receives this plasma, it may help his or her body fight the virus.
            </Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },

    whyDonateTitle: {
        fontWeight: 'bold',
        paddingTop: 20
    },
    whyDonateText: {
        padding: 10,
        lineHeight: 24
    },
    whyDonateTextTwo: {
        paddingLeft: 20,
        paddingTop: 10,
        lineHeight: 24

    }
});



//make this component available to the app
export default SettingsHome;
