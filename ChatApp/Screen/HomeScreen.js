import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { UserType } from '../Context/UserContext';
import axios from 'axios';
import User from '../components/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { IpContext, IpType } from '../Context/IpContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const { ip } = useContext(IpType);
  const [refresh, setRefresh] = useState(false);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={styles.headerLeft}>MMA Chat</Text>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <AntDesign name="profile" onPress={() => navigation.navigate('Profile')} size={24} color="black" />
          <Ionicons onPress={() => navigation.navigate('Chats')} name="chatbox-ellipses-outline" size={24} color="black" />
          <MaterialIcons onPress={() => navigation.navigate('Friends')} name="people-outline" size={24} color="black" />
          <AntDesign onPress={logout} name="logout" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      const response = await axios.get(`http://${ip}:3000/auth/users/${userId}`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  // Filtered users based on the search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) // Adjust 'user.name' based on your data structure
  );

  return (
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Users"
        value={searchQuery}
        onChangeText={setSearchQuery} // Update the search query state
      />
      <View style={{ padding: 10 }}>
        {filteredUsers.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerLeft: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
