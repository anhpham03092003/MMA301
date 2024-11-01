import { KeyboardAvoidingView, Pressable, TextInput, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { IpType } from '../Context/IpContext';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const { ip } = useContext(IpType);
  const navigation = useNavigation();

  const validate = () => {
    let valid = true;
    let errorsTemp = { name: '', email: '', password: '' };

    // Kiểm tra tên
    if (name.trim() === '') {
      errorsTemp.name = 'Name is required';
      valid = false;
    }

    // Kiểm tra email
    if (email.trim() === '') {
      errorsTemp.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorsTemp.email = 'Email is invalid';
      valid = false;
    }

    // Kiểm tra mật khẩu
    if (password.length < 6) {
      errorsTemp.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(errorsTemp);
    return valid;
  };

  const handleRegister = () => {
    if (!validate()) {
      Alert.alert('Validation failed', 'Please fix the errors before submitting.');
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    console.log(user);
    axios
      .post(`http://${ip}:3000/auth/register`, user)
      .then((res) => {
        console.log(res.data);
        Alert.alert("Registered Successfully");
        navigation.navigate("Login");
      })
      .catch((err) => {
        console.error(err);
        Alert.alert("Registration failed", "An error occurred during registration.");
      });
  };

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
            style={styles.inputField}
            placeholderTextColor={"black"}
            placeholder='Enter Your Name'
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputField}
            placeholderTextColor={"black"}
            placeholder='Enter Your Email'
            keyboardType="email-address"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={styles.inputField}
            placeholderTextColor={"black"}
            placeholder='Password'
          />
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        </View>

        <Pressable onPress={handleRegister} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Home")} style={{ marginTop: 20 }}>
          <Text style={styles.signUpText}>Already have an account? Login</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  signUpText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  inputField: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: 300,
  },
  errorText: {
    color: 'red', // Màu cho thông báo lỗi
    marginTop: 5, // Khoảng cách trên thông báo lỗi
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  header: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title1: {
    color: '#4A55A2',
    fontSize: 17,
    fontWeight: "600",
  },
  title2: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 15,
  },
});
