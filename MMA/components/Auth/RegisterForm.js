import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import hook để điều hướng

const RegisterForm = () => {
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.loginLink}>
        Already a member?{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('LoginForm')} // Điều hướng đến màn hình LoginForm khi nhấn
        >
          Login
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
  registerButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    color: '#007bff', // Màu của liên kết
    textDecorationLine: 'underline', // Gạch chân liên kết
  },
});

export default RegisterForm;
