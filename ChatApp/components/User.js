import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../Context/UserContext';
import axios from 'axios';
import { IpType } from '../Context/IpContext';
import { ImageContext } from '../Context/ImageContext';

const User = ({ item, setRefresh  }) => {
  const { userId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const { ip } = useContext(IpType);
  

  const imageList = [
    require('../images/avatar/image1.jpg'),
    require('../images/avatar/image2.jpeg'),
    require('../images/avatar/image3.jpg'),
    require('../images/avatar/image4.jpg'),
    require('../images/avatar/image5.jpg'),
    require('../images/avatar/image6.jpg'),
    require('../images/avatar/image7.jpg'),
    require('../images/avatar/image8.jpg'),
    require('../images/avatar/imageDefault.jpg'),
  ];



  
  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await axios.post(`http://${ip}:3000/friends/friend-request`, {
        currentUserId,
        selectedUserId,
      });

      if (response.status === 200) {
        setRequestSent(true); // Cập nhật trạng thái của nút ngay khi gửi yêu cầu thành công
        setFriendRequests(prev => [...prev, { _id: selectedUserId }]); // Cập nhật friendRequests
        setRefresh(prev => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    };

    fetchFriendRequests();
  }, [requestSent]); // Cập nhật khi requestSent thay đổi

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
    };

    fetchUserFriends();
  }, []);

  console.log("userFriends", userFriends);
  console.log("friendRequests", friendRequests);

  return (
    <Pressable style={styles.userTag}>
      <View>
        <Image
          style={styles.image}
          source={item?.image}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name} </Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>

      {userFriends.includes(item._id) ? (
        <Pressable style={styles.friendButton}>
          <Text style={styles.friendButtonText}>Friends</Text>
        </Pressable>
      ) : friendRequests.some(friend => friend._id === item._id) || requestSent ? (
        <Pressable style={styles.requestSentButton}>
          <Text style={styles.requestSentButtonText}>Request Sent</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendRequest(userId, item._id)}
          style={styles.addFriend}
        >
          <Text style={styles.addFriendText}>Add Friend</Text>
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
  },
  friendButton: {
    backgroundColor: "#82CD47",
    padding: 10,
    width: 105,
    borderRadius: 6
  },
  friendButtonText: {
    textAlign: "center",
    color: "white"
  },
  requestSentButton: {
    backgroundColor: "gray",
    padding: 10,
    width: 105,
    borderRadius: 6
  },
  requestSentButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 13
  }
});
