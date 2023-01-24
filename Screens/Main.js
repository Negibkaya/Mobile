import { View, ScrollView, Image, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Keyboard, Pressable, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { auth, firebase } from '../config';
import EventItem from '../components/EventItem';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../UserContext';

const Main = () => {
    const navigation = useNavigation()
  
    const [events, setEvents] = useState([])
    const eventRef = firebase.firestore().collection('events')

    const {authContext, setAuthContext} = useContext(UserContext)

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //       if (user) {
    //           console.log('render main');
    //         //   navigation.navigate("Login")
    //       }
    //       else {
    //         console.log('render not main');
    //       }
    //     })
    
    //     return unsubscribe
    // }, [])



    useEffect(() => {
        eventRef
        .onSnapshot(
            querySnapshot => {
            const events = []
            querySnapshot.forEach((doc) => {
                const {name} = doc.data()
                const {cost} = doc.data()
                const {description} = doc.data()
                const {image} = doc.data()
                events.push({
                id: doc.id,
                name,
                cost,
                description,
                image,
                })
            })
            setEvents(events)
            }
        )
    }, [])

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            setAuthContext(!authContext)
            navigation.navigate("Login")
          })
          .catch(error => alert(error.message))
      }

    return (
        <View style={styles.bg}>
            {/* <Text> {authContext ? 'Yes' : 'not'} </Text> */}

            {auth.currentUser?.email
                ?
                <View style={styles.flex}>
                    <View>
                        <Text>Email:</Text>
                        <Text>{ auth.currentUser?.email }</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleSignOut}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Выйти</Text>
                    </TouchableOpacity>
                </View>
                :  
                <View>

                </View>
            }
            <View>
                <FlatList
                    data={events}
                    numColumns={2}
                    renderItem={({item}) => (
                        <ScrollView>
                            <EventItem
                                event={item}
                            />
                        </ScrollView>

                    )}
                />
            </View>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    bg:{
        backgroundColor: '#f5f5dc',
        height: '100%',
        padding: 10,
        paddingTop:40
    },
    button:{
        height:30,
        borderRadius:5,
        backgroundColor:'#788eec',
        width:80,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
    color:'white',
    fontSize:15
    },
    flex:{
        display:'flex',
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection:'row',
        padding:15,
        backgroundColor: 'rgba(72, 254, 161, 0.2)'
    }
})