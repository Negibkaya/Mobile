import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Keyboard, Pressable, RefreshControl } from 'react-native'
import Detail from '../Screens/Detail';
import Main from '../Screens/Main';
import Order from '../Screens/Order';
import Info from '../Screens/Info';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import { auth } from '../config';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';

const Tab = createBottomTabNavigator()

const Tabs = () => {

  const {authContext, setAuthContext} = useContext(UserContext)

  // useEffect(() => {
  //   console.log('render')
  //   setState(auth.currentUser?.email)
  // }, auth.currentUser?.email)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // navigation.navigate("tabs")
        console.log('render tabs');
        console.log(unsubscribe);
      }
    })

    return unsubscribe
  }, [])


  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'tomato',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 60,
        },
        tabBarAllowFontScaling: true,
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Main') {
            return (
              <Ionicons
                name={
                  focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline'
                }
                size={40}
                color={color}
              />
            );
          } else if (route.name === 'Order') {
            return (
              <Ionicons
                name={focused ? 'add-circle-outline' : 'add-circle-outline'}
                size={40}
                color={color}
              />
            );
          } else if (route.name === 'Info') {
            return (
              <Ionicons
                name={focused ? 'ios-list' : 'ios-list'}
                size={40}
                color={color}
              />
            );
          } else if (route.name === 'Register') {
            return (
              <Ionicons
                name={focused ? 'log-in-outline' : 'log-in-outline'}
                size={40}
                color={color}
              />
            );
          } else if (route.name === 'Login') {
            return (
              <Ionicons
                name={focused ? 'log-out-outline' : 'log-out-outline'}
                size={40}
                color={color}
              />
            );
          }
        },
      })}
    >
      {auth.currentUser?.email != undefined
        ?
        (
          <>
            <Tab.Screen name="Main" component={Main} />
            <Tab.Screen name="Order" component={Order} />
            <Tab.Screen name="Info" component={Info} />
            <Tab.Screen name="Detail" component={Detail}
              options={{
                tabBarItemStyle: { display:'none' }
            }}
            />
            <Tab.Screen name="Login" component={Login} 
              options={{
                tabBarItemStyle: { display:'none' }
            }}
            />
            <Tab.Screen name="Register" component={Register} 
              options={{
                tabBarItemStyle: { display:'none' }
            }}
            />
          </>
        )
        : (
          <>
            <Tab.Screen name="Main" component={Main} />
            <Tab.Screen name="Register" component={Register} />
            <Tab.Screen name="Login" component={Login} />
          </>
        )
      }
    </Tab.Navigator>
  )
}

export default Tabs