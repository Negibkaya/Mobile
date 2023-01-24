import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { firebase, auth } from '../config'
import { UserContext } from '../UserContext'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [telephone, setTelephone] = useState('')

  const navigation = useNavigation()
  const usersRef = firebase.firestore().collection('users')
  const {authContext, setAuthContext} = useContext(UserContext)

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        setAuthContext(!authContext)
        navigation.navigate("Main")
      })
      .catch(error => alert(error.message))
      
    const data = {
        name: name,
        telephone: telephone,
        email: email,
      }
      usersRef
        .add(data)
        .then(() => {
            setAddData('')
            Keyboard.dismiss()
        })
        .catch((error) => {
            alert(error)
        })
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      {/* <Text> {authContext ? 'Yes' : 'not'} </Text>
      <TouchableOpacity onPress={() => setAuthContext(!authContext)}>
        <Text>Change</Text>
      </TouchableOpacity> */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Telephone"
          value={telephone}
          keyboardType='phone-pad'
          onChangeText={text => setTelephone(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
