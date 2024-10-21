import { KeyboardAvoidingView, Pressable, TextInput, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imgage, setImage] = useState('');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.title1}>Register</Text>

          <Text style={styles.title2}>Register to get started</Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.inputFeild}
            placeholderTextColor={"black"}
            placeholder='Enter Your Name' />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputFeild}
            placeholderTextColor={"black"}
            placeholder='Enter Your Email' />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.inputFeild}
            placeholderTextColor={"black"}
            placeholder='Password' />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.inputLabel}>Image</Text>
          <TextInput
            value={imgage}
            onChangeText={(text) => setImage(text)}
            style={styles.inputFeild}
            placeholderTextColor={"black"}
            placeholder='Image' />
        </View>


        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Home")} style={{ marginTop: 20 }}>
          <Text style={styles.signUpText}>Already have an account? Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  signUpText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  loginButton: {
    width: 200,
    backgroundColor: '#4A55A2',
    alignItems: 'center',
    padding: 15,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray"
  },
  inputFeild: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300
  },
  container:{
    flex: 1, 
    backgroundColor: 'white', 
    padding: 10, 
    alignItems: 'center'
  },
  header :{
    marginTop: 100, 
    justifyContent: "center", 
    alignItems: "center"
  },
  title1 : {
    color: '#4A55A2', 
    fontSize: 17, 
    fontWeight: "600"
  },
  title2 : {
    fontSize: 17, 
    fontWeight: "600", 
    marginTop: 15
  }
})