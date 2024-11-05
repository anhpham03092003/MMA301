import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserType } from '../Context/UserContext';
import { IpType } from '../Context/IpContext';
import axios from 'axios';


const UserChat = ({ item }) => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const { ip } = useContext(IpType);
  const [messages, setMessages] = useState([]);

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

  const getImageSource = (imageUri) => {
    const image = imageList.find((img) => img.uri === imageUri);
    return image ? image : require('../images/avatar/imageDefault.jpg');
  }; 
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/messages/get-messages/${userId}/${item._id}`);
      const data = await response.data;
      if (response.status === 200) {
        setMessages(data);
      }
    } catch (error) {
      console.log("error retrieving details", error);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const getLastMessage = () => {
    const userMessages = messages.filter((message) => message.messageType === "text");

    const n = userMessages.length;

    return userMessages[n - 1];
  }

  const lastMessage = getLastMessage();
  console.log("lastMessage", lastMessage);

  const formatTime = (timestamp) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(timestamp).toLocaleTimeString("en-US", options);
  }

  return (
    <Pressable
      style={styles.userTag}
      onPress={() => navigation.navigate("Messages",
        { recepientId: item?._id }
      )}>
      <Image source={getImageSource(item?.imageUri)} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        {lastMessage &&(
          <Text style={{ color: "gray", marginTop: 3, fontSize: 15, fontWeight: "500" }}>
          {lastMessage.message}
        </Text>
        )}
        
      </View>
      <View>
        <Text style={{ color: "#585858", fontSize: 11, fontWeight: "400" }}>
          {lastMessage && formatTime(lastMessage.timeStamp)}
          </Text>
      </View>
    </Pressable>
  )
}

export default UserChat

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
    marginVertical: 10,
    gap: 10,
    borderWidth: 0.7,
    padding: 10,
    backgroundColor: "#D0D0D0",
  },
})