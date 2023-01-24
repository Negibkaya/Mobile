import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Keyboard, Pressable } from 'react-native'
import { auth, firebase } from '../config'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';


const Info = () => {

    const [orders, setOrders] = useState([])
    const orderRef = firebase.firestore().collection('order')
    const navigation = useNavigation()


    useEffect(() => {
        orderRef
        .where('email', '==', auth.currentUser?.email)
        .onSnapshot(
            querySnapshot => {
                const orders = []
                querySnapshot.forEach((doc) => {
                    const {event} = doc.data()
                    const {status} = doc.data()
                    const {dateNow} = doc.data()
                    const {dateOrder} = doc.data()
                    const {cost} = doc.data()
                    const {desc} = doc.data()
                    const {image} = doc.data()
                    const {wishes} = doc.data()
                    orders.push({
                    id: doc.id,
                    event,
                    status,
                    dateNow,
                    dateOrder,
                    cost,
                    desc,
                    image,
                    wishes,
                    })
            })
            setOrders(orders)
            }
        )
    }, [])

    const deleteOrder = (order) => {
        orderRef
        .doc(order.id)
        .delete()
        .then(() => {
          alert('Успешно удалено')
        })
        .catch(error => {
          alert(error)
        })
    }

    return (
      <View style={styles.bg}>
        <Text style={styles.title}>
          ВАШИ ЗАКАЗЫ
        </Text>
        <FlatList
        data={orders}
        numColumns={1}
        renderItem={({item}) => (
          <ScrollView>
            <Pressable style={styles.container}
              onPress={() => navigation.navigate('Detail', {item})}>
              {item.status == 'В процессе'
              ?
              <MaterialIcons
              name='radio-button-unchecked'
              color='black'
              onPress={() => deleteOrder(item)}
              style={styles.todoIcon}
              />
              :
              item.status == 'Завершен'
              ?
              <MaterialIcons
              name='check-circle-outline'
              color='green'
              onPress={() => deleteOrder(item)}
              style={styles.todoIcon}
              />
              :
              <MaterialIcons
              name='close'
              color='red'
              onPress={() => deleteOrder(item)}
              style={styles.todoIcon}
              />
              }

              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  Событие: {item.event}
                </Text>
                <Text style={styles.itemHeading}>
                  Стоимость: {item.cost}
                </Text>
                <Text style={styles.itemHeading}>
                  Время заказа: {item.dateNow}
                </Text>
              </View>
            </Pressable>
          </ScrollView>
        )}
        />
      </View>
    
    )
}

export default Info

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#e5e5e5',
      padding:10,
      borderRadius:15,
      margin:5,
      marginHorizontal:10,
      flexDirection:'row',
      alignItems:'center'
    },
    innerContainer:{
      alignItems:'center',
      flexDirection:'column',
      marginLeft:15,
    },
    itemHeading:{
      fontWeight:'bold',
      fontSize:16,
      marginRight:10,
    },
    formContainer:{
      flexDirection:'row',
      height:80,
      marginLeft:10,
      marginRight:10,
      marginTop:100,
    },
    input:{
      height:48,
      borderRadius:5,
      overflow:'hidden',
      backgroundColor:'white',
      paddingLeft:16,
      flex:1,
      marginRight:5,
    },
    button:{
      height:47,
      borderRadius:5,
      backgroundColor:'#788eec',
      width:80,
      alignItems:'center',
      justifyContent:'center'
    },
    buttonText:{
      color:'white',
      fontSize:20
    },
    todoIcon:{
      fontSize:50,
      marginLeft:5
    },
    bg: {
      marginTop: 40
    },
    title: {
      fontSize: 25,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 5
    }
  })