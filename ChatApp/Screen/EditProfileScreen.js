import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { UserType } from '../Context/UserContext';
import { IpType } from '../Context/IpContext';
import { ImageContext } from '../Context/ImageContext';

const EditProfileScreen = () => {
  const { userId } = useContext(UserType);
  const { ip } = useContext(IpType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { selectedImage, setSelectedImage } = useContext(ImageContext);
  const [showImageList, setShowImageList] = useState(false);

  // Sử dụng require cho các hình ảnh cục bộ
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
  console.log(imageList)
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://${ip}:3000/auth/${userId}/profile`);
        if (response.status === 200) {
          setName(response.data.name);
          setEmail(response.data.email);
          setSelectedImage(response.data.image || require('../images/avatar/imageDefault.jpg')); // Sử dụng hình ảnh mặc định nếu không có
        } else {
          console.log('Failed to fetch user profile');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://${ip}:3000/auth/${userId}/edit-profile`, {
        name,
        email,
        image: selectedImage, // Gửi hình ảnh đã chọn
      });
      console.log(selectedImage);
      if (response.status === 200) {
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.put(`http://${ip}:3000/auth/${userId}/change-password`, {
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setShowImageList(false);
  };

  const toggleImageList = () => {
    setShowImageList((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Image selection */}
      <View style={styles.imageSelection}>
        <Text style={styles.imageSelectionText}>Select an Image:</Text>
        <Pressable onPress={toggleImageList}>
          <Image
            source={selectedImage} // Sử dụng hình ảnh đã chọn
            style={styles.avatarImage}
          />
        </Pressable>
        
        {/* List of images */}
        {showImageList && (
          <View style={styles.imageList}>
            {imageList.map((image, index) => (
              <Pressable key={index} onPress={() => handleImageSelect(image)}>
                <Image
                  source={image}
                  style={styles.thumbnailImage}
                />
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        readOnly
      />
      <Text style={styles.subTitle}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Pressable onPress={handleUpdateProfile} style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </Pressable>
      <Pressable onPress={handleChangePassword} style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </Pressable>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#567189',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageSelection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageSelectionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
});
