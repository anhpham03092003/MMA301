import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import axios from 'axios';
import { UserType } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';

const FriendRequest = ({item, friendRequests, setFriendRequests}) => {
    const ip = "192.168.67.101";
    const {userId, setUserId} = useContext(UserType);
    const navigation = useNavigation();
    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await axios.post(`http://${ip}:3000/friends/friend-request/accept`,{
                senderId: friendRequestId,
                recipientId: userId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setFriendRequests(
                  friendRequests.filter((request) => request._id !== friendRequestId)
                );
                navigation.navigate("Chats");
              }
        } catch (error) {
            console.log("error accepting request", error);
        }
    }
    return (
        <Pressable style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item?.name} sent you a friend request
            </Text>

            <Pressable 
            onPress={() => acceptRequest(item._id)}
            style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept</Text>
            </Pressable>
        </Pressable>

    )
}

export default FriendRequest

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    acceptButton: {
        backgroundColor: "#0066b2",
        padding: 10,
        borderRadius: 6,
        marginRight: 10
    },
    acceptButtonText: {
        color: "white",
        textAlign: "center",
        fontSize: 13
    }
})