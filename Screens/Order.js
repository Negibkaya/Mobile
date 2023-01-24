import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Keyboard, Pressable, SafeAreaView, Button } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth, firebase } from '../config'
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';


const Order = () => {

    const [dataEvent, setDataEvent] = useState([])
    const eventRef = firebase.firestore().collection('events')
    const [dataType, setDataType] = useState([])
    const typeEventRef = firebase.firestore().collection('typeEvent')
    const orderRef = firebase.firestore().collection('order')

    const [valueEvent, setValueEvent] = useState(dataEvent);
    const [isFocusEvent, setIsFocusEvent] = useState(false);
    const [valueType, setValueType] = useState(dataType);
    const [isFocusType, setIsFocusType] = useState(false);

    const [addData, setAddData] = useState('')


    const [datePicker, setDatePicker] = useState(false);

    const [date, setDate] = useState(new Date());

    const time= new Date(Date.now());

    function showDatePicker() {
        setDatePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };

    useEffect(() => {
        eventRef
        .onSnapshot(
            querySnapshot => {
            const dataEvent = []
            querySnapshot.forEach((doc) => {
                const {name} = doc.data()
                const {description} = doc.data()
                const {cost} = doc.data()
                const {image} = doc.data()
                dataEvent.push({
                    name,
                    description,
                    cost,
                    image
                })
            })
            setDataEvent(dataEvent)
            }
        )
    }, [])

    useEffect(() => {
        typeEventRef
        .onSnapshot(
            querySnapshot => {
            const dataType = []
            querySnapshot.forEach((doc) => {
                const {label} = doc.data()
                const {cost} = doc.data()
                dataType.push({
                    label,
                    cost
                })
            })
            setDataType(dataType)
            }
        )
    }, [])


    const addOrder = () => {
        const data = {
            event: valueEvent.name,
            type: valueType.label,
            cost: valueEvent.cost+valueType.cost,
            desc: valueEvent.description,
            dateNow: time.toDateString(),
            dateOrder: date.toDateString(),
            wishes: addData,
            email: auth.currentUser?.email,
            status: 'В процессе',
            image: valueEvent.image
          }
        orderRef
            .add(data)
            .then(() => {
                setAddData('')
                Keyboard.dismiss()
            })
            .catch((error) => {
                alert(error)
            })
        alert('Заказ добавлен')
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.textDesc}> Тип события </Text>
            <Dropdown
            style={[styles.dropdown, isFocusEvent && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataEvent}
            maxHeight={300}
            labelField="name"
            valueField="value"
            value={dataEvent}
            onFocus={() => setIsFocusEvent(true)}
            onBlur={() => setIsFocusEvent(false)}
            onChange={item => {
                setValueEvent(item);
                setIsFocusEvent(false);
            }}
            />
            <Text style={styles.textDesc}> Описание </Text>
            <Text style={styles.dropdown}> { valueEvent.description } </Text>
            <Text style={styles.textDesc}> Ваши пожелания </Text>
            <TextInput 
            style={styles.dropdown}
            onChangeText={(wishes) => setAddData(wishes)}
            value={addData}
            />
            <Text style={styles.textDesc}> В каком виде сделать </Text>
            <Dropdown
            style={[styles.dropdown, isFocusType && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataType}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={dataType}
            onFocus={() => setIsFocusType(true)}
            onBlur={() => setIsFocusType(false)}
            onChange={item => {
                setValueType(item);
                setIsFocusType(false);
            }}
            />
            <Text style={styles.textDesc}> Срок выполнения </Text>
            <Text style={styles.dropdown}>{date.toDateString()}</Text>
            {datePicker && (
            <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelected}
                style={styles.datePicker}
            />
            )}
            {!datePicker && (
            <View>
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style={styles.btn}>
                        Выбрать дату
                    </Text>
                </TouchableOpacity>
            </View>
            )}
            <Text style={styles.textDesc}> Стоимость </Text>
            <Text style={styles.dropdown}> { valueEvent.cost+valueType.cost } </Text>
            <TouchableOpacity onPress={addOrder}
                
            >
                <Text style={styles.btn}>
                    Сделать заказ
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Order


const styles = StyleSheet.create({
    container: {
      padding: 16,
      marginTop: 30,
      height:'100%',
      backgroundColor: '#ffecba',
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      textAlignVertical:'center',
      backgroundColor: 'white'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    textDesc: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        height:30
    },
    MainContainer: {
        flex: 1,
        padding: 6,
        alignItems: 'center',
    },
    text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
    },
    // Style for iOS ONLY...
    datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
    },
    btn: {
        fontSize:15,
        fontWeight:'600',
        textAlign:'center',
        backgroundColor: 'rgba(14, 87, 141, 1)',
        borderRadius: 50,
        marginTop:5,
        color:'white'
    }
});