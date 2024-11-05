import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './Navigation/StackNavigator';
import { UserContext } from './Context/UserContext';
import { IpContext } from './Context/IpContext';
import { ImageProvider } from './Context/ImageContext';

export default function App() {
  return (
    <>
      <IpContext>
      <ImageProvider>
        <UserContext>
          <StackNavigator />
        </UserContext>
      </ImageProvider>
      </IpContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
