import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native'

const EventItem = ({ event }) => {
  const [modalVisiable, setModalVisiable] = useState(false)




  return (
    <TouchableOpacity
        style={styles.eventItem}
        onPress={() => setModalVisiable(!modalVisiable)}
    >
      <Image
        style={styles.image}
        source={{uri:event.image}}
      />
      <Text>
        { event.name }
      </Text>
      <Modal
        animationType='slide'
        presentationStyle='formSheet'
        visible={modalVisiable}
      >
        <View style={styles.modal}>
          <Text 
            style={styles.close}
            onPress={() => setModalVisiable(!modalVisiable)}
          > 
            &times; 
          </Text>
          <Image
            source={{uri:event.image}}
            style={styles.modalImg}
          />
          <Text style={styles.textDesc}> Описание праздника </Text>
          <Text style={styles.overview}>
            { event.description }
          </Text>
          <Text style={styles.textDesc}> Стоимость </Text>
          <Text style={styles.overview}>
            { event.cost }
          </Text>
        </View>
      </Modal>
    </TouchableOpacity>
  )
}

export default EventItem


const styles = StyleSheet.create({
    eventItem: {
      marginTop: 15,
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    image:{
        width:150,
        height:150,
        resizeMode:'contain',
    },
    modal:{
      padding:15,
      height:'100%',
      backgroundColor: 'rgba(238, 252, 245, 1)'
    },
    close:{
      fontSize:30,
      textAlign:'right'
    },
    modalImg:{
      width:300,
      height:300,
      resizeMode:'contain',
      display:'flex',
      alignSelf:'center',
      marginBottom:10
    },
    overview:{
      fontSize:20,
      marginBottom:10
    },
    textDesc: {
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: 10
  },
})