import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useContext, useLayoutEffect, useState, useEffect } from 'react'
import { Entypo, Feather, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import EmojiSelector from 'react-native-emoji-selector';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserType } from '../Context/UserContext';
import { IpType } from '../Context/IpContext';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const ChatMessagesScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const navigate = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const { recepientId } = route.params;
  const [recepientData, setRecepientData] = useState();
  const { userId, setUserId } = useContext(UserType);
  const { ip } = useContext(IpType);
  const [message, setMessage] = useState("");
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  }

  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/messages/get-recepient/${recepientId}`);
        const data = await response.data;
        if (response.status === 200) {
          setRecepientData(data);
        }
      } catch (error) {
        console.log("error retrieving details", error);
      }
    };

    fetchRecepientData();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/messages/get-messages/${userId}/${recepientId}`);
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
  const handleSendMessage = async (messageType, imageUri) => {
    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("recepientId", recepientId);
      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("imageFile", {
          uri: imageUri,
          type: imageUri.endsWith('.png') ? 'image/png' : 'image/jpeg',
          name: imageUri.split('/').pop()
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }
      const response = await axios.post(`http://${ip}:3000/messages/send-messages`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Thêm header này
        }
      });

      if (response.status === 200) {
        setMessage("");
        setSelectedImage("");
        fetchMessages();
      }
    } catch (error) {
      console.log("error to send message", error);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000); 
  
    return () => clearInterval(intervalId); 
  }, [userId, recepientId]);


  useLayoutEffect(() => {
    navigate.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            onPress={() => navigate.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>{selectedMessages.length}</Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={
                recepientData?.image}
              style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "500" }}>{recepientData?.name}</Text>
          </View>
          )}

          

        </View>
      ),

      headerRight: () => selectedMessages.length > 0 ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          
          <MaterialIcons onPress={() => deleteMessages(selectedMessages)} name="delete" size={24} color="black" />
        </View>
      ) : null,
    })
  }, [recepientData, selectedMessages]);

  const deleteMessages = async (messageIds) => {
    try {
      const response = await axios.post(`http://${ip}:3000/messages/delete-messages`, { messages: messageIds });
      if (response.status === 200) {
        setSelectedMessages((previousMessages) => previousMessages.filter((id) => !messageIds.includes(id)));
        fetchMessages();
      }
    } catch (error) {
      console.log("error to delete message", error);
    }
  }
  const formatTime = (timestamp) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(timestamp).toLocaleTimeString("en-US", options);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      handleSendMessage("image", imageUri);
    }
  }

  const handleSelectMessage = (message) => {
    const isSelected = selectedMessages.includes(message._id);
    if (isSelected) {
      setSelectedMessages((previousMessages) => previousMessages.filter((id) => id !== message._id));
    } else {
      setSelectedMessages((previousMessages) => [...previousMessages, message._id]);
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <ScrollView>
        {messages.map((item, index) => {
          if (item.messageType === "text") {
            const isSelected = selectedMessages.includes(item._id);
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[item.senderId?._id === userId ? styles.sendText : styles.recepientText, 
                isSelected && { backgroundColor: "lightgray", width: "100%" }]}>
                <Text style={{ fontSize: 13, textAlign: isSelected ? "right" : "left" }}>{item?.message}</Text>
                <Text style={styles.timeStamp}>{formatTime(item.timeStamp)}</Text>
              </Pressable>
            )
          }

          if (item.messageType === "image") {
            const baseUrl = `http://${ip}:3000/`;
            const imageUrl = item.imageUrl;
            const filename = imageUrl.split("/").pop();
            const source = { uri: `${baseUrl}${filename}`.replace(/\\/g, '/') };
            return (
              <Pressable style={[item.senderId?._id === userId ? styles.sendText : styles.recepientText]}>
                <Image
                  source={source}
                  style={{ width: 200, height: 200, borderRadius: 7 }}
                />
                <Text style={styles.timeStamp}>{formatTime(item.timeStamp)}</Text>
              </Pressable>
            )
          }
        })}
      </ScrollView>

      <View style={[styles.chatContainer, { marginBottom: showEmojiSelector ? 0 : 25 }]}>
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }} name="emoji-happy" size={24} color="black" />

        <TextInput
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input} placeholder='Type your message ...' />

        <View style={styles.featureChat}>
          <Entypo
            onPress={pickImage}
            name="camera" size={24} color="black" />
          <Feather name="mic" size={24} color="black" />
        </View>

        <Pressable
          onPress={() => handleSendMessage("text")}
          style={styles.sendButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
        </Pressable>
      </View>

      {
        showEmojiSelector && (
          <EmojiSelector
            onEmojiSelected={(emoji) => setMessage(message + emoji)}
            style={{ height: 250 }}
          />
        )
      }


    </KeyboardAvoidingView >
  )
}

export default ChatMessagesScreen

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#dddddd",

  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  featureChat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sendText: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 8,
    margin: 10,
    borderRadius: 7,
    maxWidth: "60%"
  },
  recepientText: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    padding: 8,
    margin: 10,
    borderRadius: 7,
    maxWidth: "60%"
  },
  timeStamp: {
    textAlign: "right",
    fontSize: 9,
    color: "gray",
    marginTop: 5
  }
})