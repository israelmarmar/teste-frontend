import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../firebase/config'
import styles from './styles'

export interface HomeScreenProps {
    email: string,
    fullName: string,
    country: string
}

const HomeScreen: React.FC<HomeScreenProps> = ({ email, fullName, country, uid }) => {
    console.log(email, fullName, country, uid);
    const [fullNameState, setFullName] = useState(fullName);
    const [emailState, setEmail] = useState(email);
    const [countryState, setCountry] = useState(country);
    const [loadSave, setLoadSave] = useState(false);

    function save(uid: string){
        const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set({email: emailState, fullName: fullNameState, country: countryState, id: uid})
                    .then(() => {
                        setLoadSave(false);
                    })
                    .catch((error) => {
                        setLoadSave(false);
                        alert(error)
                    });
    }


    const { navigate } = useNavigation();
    return (
        <>
            <View style={styles.container}>
                <View style={styles.profile}>

                    <View style={styles.profileInfo}>

                        <TextInput
                            style={styles.input}
                            placeholder='Nome Completo'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setFullName(text)}
                            value={fullNameState}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setEmail(text)}
                            value={emailState}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='País'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) => setCountry(text)}
                            value={countryState}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={[styles.button, loadSave ? styles.buttonDisabled : {}]}
                            onPress={() => { save(uid) }}
                            disabled={loadSave}>

                            {loadSave ? <Text style={styles.buttonTitle}>...</Text> :
                                <Text style={styles.buttonTitle}>Salvar</Text>}
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={() => { firebase.auth().signOut(); navigate('Select'); }}>
                <Text style={styles.buttonTitle}>Sair</Text>
            </TouchableOpacity>
        </>
    )
}

export default HomeScreen;