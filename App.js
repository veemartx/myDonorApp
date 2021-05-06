import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeStack from './app/stacks/appStack'
import AccountStack from './app/stacks/accountStack'
import DonationsStack from './app/stacks/donationsStack'
import RequestsStack from './app/stacks/requestsStack'
import SettingsStack from './app/stacks/settingsStack'


import AppContext from './app/providers/AppContext'
// import 'react-native-get-random-values'


// import  
const Tabs = createBottomTabNavigator();

function App() {

  // set variable
  const [user, setUser] = useState({})


  var globalVariables = {
    user: user,
    setUser: setUser,
  }


  return (

    <AppContext.Provider value={globalVariables}>
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';

              } else if (route.name === 'Account') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Requests') {
                iconName = focused ? 'download' : 'download-outline';
              }
              else if (route.name === 'Donations') {
                iconName = focused ? 'download' : 'download';
              }
              else if (route.name === 'Settings') {
                iconName = focused ? 'cog' : 'cog-outline';
              }
              else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }


              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'crimson',
            inactiveTintColor: 'gray',

          }}
        >

          <Tabs.Screen name="Home" component={HomeStack} />
          <Tabs.Screen name="Requests" component={RequestsStack} />
          <Tabs.Screen name="Donations" component={DonationsStack} />
          <Tabs.Screen name="Settings" component={SettingsStack} />
          <Tabs.Screen name="Profile" component={AccountStack} />
        </Tabs.Navigator>

      </NavigationContainer>
    </AppContext.Provider>

  );

}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
