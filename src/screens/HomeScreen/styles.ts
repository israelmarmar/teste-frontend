import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonDisabled: {
        backgroundColor: '#BCC6F1'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        padding: 16
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
        flex: 1,  
        width: '100%'
    },
    name: {
        color: '#32264d',
        fontSize: 20,
    },
    other: {
        color: '#6a6180',
        fontSize: 20,
        marginTop: 4
    },

});

export default styles;