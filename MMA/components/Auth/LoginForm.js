import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import hook để điều hướng

const LoginForm = () => {
  const navigation = useNavigation(); // Lấy đối tượng điều hướng

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.registerLink}>
        Not a member?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('RegisterForm')} // Điều hướng đến màn hình RegisterForm khi nhấn
        >
          Register
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // Đối với Android
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  registerLink: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: '#007bff', // Màu của liên kết
    textDecorationLine: 'underline', // Gạch chân liên kết
  },
});

export default LoginForm;
