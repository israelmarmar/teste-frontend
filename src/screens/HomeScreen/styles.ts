import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#e6e6fa',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24
    },

    profileInfo: {
        marginLeft: 16,
    },
    name: {
        color: '#32264d',
        fontSize: 20,
    },
    other: {
        color: '#6a6180',
        fontSize: 12,
        marginTop: 4
    },

});

export default styles;