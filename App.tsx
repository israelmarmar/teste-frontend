import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, SelectLoginScreen } from './src/screens'
import { firebase } from './src/firebase/config'
import { decode, encode } from 'base-64'
import HomeScreenProps from './src/screens/HomeScreen/HomeScreen'
import {
  GoogleSignin
} from '@react-native-community/google-signin'

if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<HomeScreenProps>(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false)
          });
        console.log(user);
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...(props.route.params ? props: user)} />}
            </Stack.Screen>
            <Stack.Screen name="Select" component={SelectLoginScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        ) : (
            <>
              <Stack.Screen name="Select" component={SelectLoginScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="Home">
                {props => <HomeScreen  {...(props.route.params)} />}
              </Stack.Screen>
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}