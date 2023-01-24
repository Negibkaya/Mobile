import { View, Text, TextInput, Pressable, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'



const Detail = ({ route }) => {
  const navigate = useNavigation()


  return (
    <View style={styles.container}>
        <Image
          source={{uri:route.params.item.image}}
          style={styles.img}
        />
        <Text style={styles.date}>
          Срок до : { route.params.item.dateOrder }
        </Text>
        <Text style={styles.name}>
          { route.params.item.event }
        </Text>
        <Text style={styles.wish}>
          Пожелания заказчика:
        </Text>
        <Text style={styles.wish}>
          { route.params.item.wishes }
        </Text>
        <View style={styles.flex}>
          <View style={styles.sameFlex}>
            <Text style={styles.text}>
              Стоимость
            </Text>
            <Text style={styles.text}>
              { route.params.item.cost }
            </Text>
          </View>
          <TouchableOpacity style={styles.sameFlex} onPress={() => alert("Должна быть оплата(")}>
            <Text style={styles.pay}>Оплатить</Text>
          </TouchableOpacity>
          <View style={styles.sameFlex}>
            <Text style={styles.text}>
              Статус
            </Text>
            <Text style={styles.text}>
              { route.params.item.status }
            </Text>
          </View>
        </View>
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  container:{
    paddingTop:40,
    paddingLeft:35,
    paddingRight:35,
    height:'100%',
    backgroundColor: 'rgba(252,222,167,255)'
  },
  date: {
    color: 'orange',
    textAlign:'center',
    fontSize:14,
    marginBottom:15,
    marginTop:20,
    fontWeight:'900'
  },
  name:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:18,
    marginBottom:20
  },
  desc: {
    textAlign:'center',
    fontSize:14,
    marginBottom:10,
    fontWeight:'300',
  },
  wish: {
    textAlign:'center',
    fontSize:16,
    marginBottom:10,
    fontWeight:'500',
    marginTop:5
  },
  textField: {
    marginBottom:10,
    padding:10,
    fontSize:15,
    color:'#000000',
    backgroundColor:'#e0e0e0',
    borderRadius:5
  },
  buttonUpdate:{
    marginTop:25,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:12,
    paddingHorizontal:32,
    borderRadius:4,
    elevation:10,
    backgroundColor:'#0de065'
  },
  img: {
    width:220,
    height:220,
    resizeMode:'contain',
    display:'flex',
    alignSelf:'center',
    marginBottom:10
  },
  flex:{
    display:'flex',
    justifyContent:'space-around',
    alignItems: 'center',
    flexDirection:'row',
    marginTop:10,
    padding:5,
    backgroundColor: 'orange',
    borderRadius:15
  },
  sameFlex: {
    backgroundColor: 'orange',    
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pay: {
    fontSize:18,
    fontWeight:'900'
  },
  text: {
    fontWeight:'900'
  }
})