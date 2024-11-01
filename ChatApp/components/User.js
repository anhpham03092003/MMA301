import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../Context/UserContext';
import axios from 'axios';
import {IpType } from '../Context/IpContext';


const User = ({ item }) => {
  const {userId, setUserId} = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const {ip} = useContext(IpType);
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

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/friends/sent-friend-requests/${userId}`);

        if (response.status === 200) {
          setFriendRequests(response.data);
        } else {
          console.log('Failed to fetch friend requests');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchFriendRequests();
  }, [])

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/friends/find-friend/${userId}`);
        if (response.status === 200) {
          setUserFriends(response.data);
        } else {
          console.log('Failed to fetch user friends');
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserFriends();
  }, [])

  console.log("userFriends",userFriends);
  console.log("user",friendRequests);
  return (

    <Pressable
    style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
  >
    <View>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          resizeMode: "cover",
        }}
        source={require(`../images/avatar.jpg`)}
      />
    </View>

    <View style={{ marginLeft: 12, flex: 1 }}>
      <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
      <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
    </View>     
    {userFriends.includes(item._id) ? (
      <Pressable
        style={{
          backgroundColor: "#82CD47",
          padding: 10,
          width: 105,
          borderRadius: 6,
        }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
      </Pressable>
    ) : requestSent || friendRequests.some((friend) => friend._id === item._id) ? (
      <Pressable
        style={{
          backgroundColor: "gray",
          padding: 10,
          width: 105,
          borderRadius: 6,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
          Request Sent
        </Text>
      </Pressable>
    ) : (
      <Pressable
        onPress={() => sendFriendRequest(userId, item._id)}
        style={{
          backgroundColor: "#567189",
          padding: 10,
          borderRadius: 6,
          width: 105,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
          Add Friend
        </Text>
      </Pressable>
    )}
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