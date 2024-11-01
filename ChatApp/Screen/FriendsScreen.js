import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../Context/UserContext';
import axios from 'axios';
import FriendRequest from '../components/FriendRequest';
import { IpContext, IpType } from '../Context/IpContext';

const FriendsScreen = () => {
  const {ip} = useContext(IpType);
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  useEffect(() => {
    fetchFriendsRequest();
  }, [])
  const fetchFriendsRequest = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/friends/friend-request/${userId}`);
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image
        }))
        setFriendRequests(friendRequestsData);
      }
    } catch (error) {

    }
  }
  console.log(friendRequests);
  return (
    <View>
      {friendRequests.length > 0 && <Text>Your Friend Requests</Text>}
      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests} />
      ))}
    </View>
  )
}

export default FriendsScreen

const styles = StyleSheet.create({})