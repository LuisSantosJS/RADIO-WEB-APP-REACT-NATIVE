import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        height: height - width * 0.15,
        width: width,
        backgroundColor: '#30AE5D',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    header: {
        width: width,
        height: width * 0.15,
        backgroundColor: '#258E4A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.01
    },
    ViewIconHeader: {
        width: width * 0.15,
        height: width * 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconHeader: {
        height: '45%',
        width: '55%'
    },
    logo: {
        height: width * 0.45,
        width: width * 0.45,
        borderRadius: ((width * 0.45) / 2),
        backgroundColor: '#258E4A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLive: {
        color: 'white',
        fontSize: width * 0.04
    },
    textHeader: {
        color: 'white',
        fontSize: width * 0.1
    },
    gradeLine: {
        width: '70%',
        height: width * 0.004,
        backgroundColor: 'white'
    },
    textTitleInfo: {
        fontSize: width * 0.05,
        color: 'white',
        fontWeight: 'bold'
    },
    emailText: {
        fontSize: width * 0.04,
        color: 'white',
    },
    copyrigth: {
        fontSize: width * 0.03,
        color: 'white'
    }
});
export default styles;