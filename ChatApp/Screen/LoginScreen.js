import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const ip = "192.168.67.101";
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
      if (token) {
        navigation.navigate("Home")
      }else{
        
      }
      } catch (error) {
        console.log(error);
      } 
    }

    checkLoginStatus();
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://${ip}:3000/auth/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);

        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
        console.log("Login Error", error);
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.title1}>Sign In</Text>

          <Text style={styles.title2}>Sign in to your account</Text>
        </View>

        <View style={{ marginTop: 50 }}>
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


        <Pressable
          onPress={handleLogin}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen

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
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center'
  },
  header: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  title1: {
    color: '#4A55A2',
    fontSize: 17,
    fontWeight: "600"
  },
  title2: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 15
  }
})