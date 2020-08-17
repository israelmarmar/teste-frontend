import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../firebase/config'
import styles from './styles'

export interface HomeScreenProps {
    email: string,
    fullName: string,
    country: string
}

const HomeScreen: React.FC<HomeScreenProps> = ({ email, fullName, country }) => {
    console.log(email, fullName, country);
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.profile}>

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.other}>{email}</Text>
                    <Text style={styles.other}>{country}</Text>
                </View>
    
            </View>

            <TouchableOpacity style={styles.button} onPress={()=>{firebase.auth().signOut();navigate('Select');}}>
                    <Text style={styles.buttonTitle}>Sair</Text>
            </TouchableOpacity>

        </View>
    )
}

export default HomeScreen;