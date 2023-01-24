import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Keyboard, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [todos, setTodos] = useState([])
  const todoRef = firebase.firestore().collection('todos')
  const [addData, setAddData] = useState('')
  const navigation = useNavigation()
  
  useEffect(() => {
    todoRef
    .orderBy('createAt', 'desc')
    .onSnapshot(
      querySnapshot => {
        const todos = []
        querySnapshot.forEach((doc) => {
          const {heading} = doc.data()
          const {called} = doc.data()
          todos.push({
            id: doc.id,
            heading,
            called,
          })
        })
        setTodos(todos)
      }
    )
  }, [])


  const deleteTodo = (todos) => {
    todoRef
      .doc(todos.id)
      .delete()
      .then(() => {
        alert("delete successfully")
      })
      .catch(error => {
        alert(error)
      })
  }


  const addTodo = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        heading: addData,
        createAt: timestamp,
      }
      todoRef
        .add(data)
        .then(() => {
          setAddData('')
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  const Email = () => {
    console.log(auth.currentUser.email)
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }


  return (
    <View style={{flex:1}}>
      <Text>Email: { auth.currentUser?.email }</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add text'
          placeholderTextColor='#aaaaa'
          onChangeText={(heading) => setAddData(heading)}
          value={addData}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />

        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={Email}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Email</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({item}) => (
          <View>
            <Pressable style={styles.container}
              onPress={() => navigation.navigate('Detail', {item})}>
              <FontAwesome
                name='trash-o'
                color='red'
                onPress={() => deleteTodo(item)}
                style={styles.todoIcon}
              />
              <View style={styles.innerContainer}>
                <Text style={styles.itemHeading}>
                  {item.heading[0].toUpperCase() + item.heading.slice(1)}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#e5e5e5',
    padding:15,
    borderRadius:15,
    margin:5,
    marginHorizontal:10,
    flexDirection:'row',
    alignItems:'center'
  },
  innerContainer:{
    alignItems:'center',
    flexDirection:'column',
    marginLeft:45,
  },
  itemHeading:{
    fontWeight:'bold',
    fontSize:18,
    marginRight:22,
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
    marginTop:5,
    fontSize:20,
    marginLeft:14
  }
})