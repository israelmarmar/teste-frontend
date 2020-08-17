import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { firebase } from '../../firebase/config';
import styles from './styles';
import * as AppAuth from 'expo-app-auth';
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID } from '../../utils/keys';

export default function SelectLoginScreen() {

  const { navigate } = useNavigation();

  function onLoginSuccess(googleProfileData: any) {
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

      console.log(result);

      if (result.idToken) {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        const googleProfileData = await firebase.auth().signInWithCredential(credential);
        onLoginSuccess(googleProfileData);
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
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
        onPress={() => { navigate('Login') }}>
        <FontAwesome name={'facebook-square'} style={styles.icon} />
        <Text style={styles.buttonTitle}>Login com Facebook</Text>
      </TouchableOpacity>

    </View>
  )
}