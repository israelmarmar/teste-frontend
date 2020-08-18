import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../../firebase/config';
import styles from './styles';
import * as Facebook from 'expo-facebook';
import * as AppAuth from 'expo-app-auth';
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID, FACEBOOK_CLIENT_ID } from '../../utils/keys';

export default function SelectLoginScreen() {

  const { navigate } = useNavigation();

  function onLoginSuccess(googleProfileData: any) {
    console.log("googleProfileData: "+JSON.stringify(googleProfileData));
    navigate('Home', googleProfileData);
  }

  function onLoginFailure(errorMessage: any) {
    alert(errorMessage);
  }

  async function signInWithGoogle() {

    try {
      const result = await AppAuth.authAsync({
        issuer: 'https://accounts.google.com',
        scopes: ['openid', 'profile'],
        /* This is the CLIENT_ID generated from a Firebase project */
        clientId: ANDROID_CLIENT_ID,
        redirectUrl: AppAuth.OAuthRedirect + ':/oauthredirect'
      });


      if (result.idToken) {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        const googleProfileData = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        const data = await firebase.firestore().collection('users').doc(googleProfileData.user.uid).get();
        console.log(data.data());
        onLoginSuccess({uid: googleProfileData.user.uid, ...data.data()});
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }

  }

  async function signInWithFacebook() {
    try {
      await Facebook.initializeAsync(FACEBOOK_CLIENT_ID);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInWithCredential(credential);
        console.log(facebookProfileData);
        const data = await firebase.firestore().collection('users').doc(facebookProfileData.user.uid).get();
        console.log(data.data());
        onLoginSuccess({uid: facebookProfileData.user.uid, ...data.data()});
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => { navigate('Login') }}>
        <FontAwesome name={'envelope'} style={styles.icon} />
        <Text style={styles.buttonTitle}>Login com E-mail</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => signInWithGoogle()}>
        <FontAwesome name={'google'} style={styles.icon} />
        <Text style={styles.buttonTitle}>Login com Google</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.button}
        onPress={() => signInWithFacebook() }>
        <FontAwesome name={'facebook-square'} style={styles.icon} />
        <Text style={styles.buttonTitle}>Login com Facebook</Text>
      </TouchableOpacity>

    </View>
  )
}