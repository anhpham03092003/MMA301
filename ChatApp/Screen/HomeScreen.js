import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { UserType } from '../Context/UserContext';
import axios from 'axios';
import User from '../components/User';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from 'jwt-decode';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import { IpContext, IpType } from '../Context/IpContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const {ip} = useContext(IpType);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={styles.headerLeft}>MMA Chat</Text>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons onPress={() => navigation.navigate("Friends")} name="people-outline" size={24} color="black" />
          <AntDesign onPress={logout} name="logout" size={24} color="black" />
        </View>
      ),
    })
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        console.log("token", token);
        const decodedToken = jwt_decode(token);
        console.log("decodedToken", decodedToken);
      const userId = decodedToken.userId;
      console.log("userId", userId);
      setUserId(userId);
      axios.get(`http://${ip}:3000/auth/users/${userId}`).then((response) => {
        setUsers(response.data);
      }).catch((error) => {
        console.log("ko tim dc user", error);
      })
      } catch (error) {
        console.log(error);
      }

    };

    fetchUsers();
  }, []);
  console.log("JWT Decode:", jwt_decode);
  console.log("users", users);
  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  headerLeft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  }
})