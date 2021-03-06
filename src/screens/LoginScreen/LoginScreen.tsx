import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../firebase/config'
import styles from './styles';
import { auth } from 'firebase';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadEmail, setLoadEmail] = useState(false);

    const { navigate } = useNavigation();

    const onFooterLinkPress = () => {
        navigate('Registration')
    }

    const onLoginPress = () => {
        setLoadEmail(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response: firebase.auth.UserCredential) => {
                const uid: string = response.user.uid

                console.log(uid);
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data();
                        console.log(user);
                        setLoadEmail(false);
                        navigate('Home', user);
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error);
                setLoadEmail(false);
            })
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={[styles.button, loadEmail?styles.buttonDisabled:{}]}
                    onPress={() => onLoginPress()}
                    disabled={loadEmail}>

                    {loadEmail ? <Text style={styles.buttonTitle}>...</Text> :
                        <Text style={styles.buttonTitle}>Log in</Text>}
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Não tem conta? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Cadastrar</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}