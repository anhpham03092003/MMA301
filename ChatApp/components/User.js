import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../Context/UserContext';
import axios from 'axios';

const User = ({ item }) => {
  const {userId, setUserId} = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const ip = "192.168.67.101";
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      axios.post(`http://${ip}:3000/friends/friend-request`, {
        currentUserId,
        selectedUserId
      });
      if (response.status === 200) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <Pressable style={styles.userTag}>
      <View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>

      <Pressable 
      onPress={()=> sendFriendRequest(userId, item._id)}
      style={styles.addFriend}>
        <Text style={styles.addFriendText}>
          Add Friend
        </Text>
      </Pressable>
    </Pressable>
  )
}

export default User

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover'
  },
  userTag: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  addFriend: {
    backgroundColor: "#567189",
    padding: 10,
    borderRadius: 6,
    width: 105
  },
  addFriendText: {
    color: "white",
    textAlign: "center",
    fontSize: 13
  }
})