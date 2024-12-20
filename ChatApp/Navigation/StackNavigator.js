import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen';
import HomeScreen from '../Screen/HomeScreen';
import FriendsScreen from '../Screen/FriendsScreen';
import ChatsScreen from '../Screen/ChatsScreen';
import ChatMessagesScreen from '../Screen/ChatMessagesScreen';
import EditProfileScreen from '../Screen/EditProfileScreen';
const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Friends" component={FriendsScreen} />
                <Stack.Screen name="Chats" component={ChatsScreen} />
                <Stack.Screen name="Messages" component={ChatMessagesScreen} />
                <Stack.Screen name="Profile" component={EditProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})