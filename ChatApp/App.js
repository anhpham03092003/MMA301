import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './Navigation/StackNavigator';
import { UserContext } from './Context/UserContext';

export default function App() {
  return (
    <>
    <UserContext>
      <StackNavigator />
    </UserContext>
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
