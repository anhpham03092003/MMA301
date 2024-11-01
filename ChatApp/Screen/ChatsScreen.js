import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { IpType } from '../Context/IpContext';
import axios from 'axios';
import UserChat from '../components/UserChat';

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  const navigation = useNavigation();
  const {ip} = useContext(IpType);
  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/friends/accepted-friends/${userId}`);
        const data = await response.data;
        if (response.status === 200) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("ko tim dc user", error);
      }
    }
    acceptedFriendsList();
  },[])
  console.log(acceptedFriends);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item}/>
        ))}
      </Pressable>
    </ScrollView>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})