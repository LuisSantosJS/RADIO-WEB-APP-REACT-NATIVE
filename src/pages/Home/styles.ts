import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    InputChat: {
        width: '100%',
        height: height * 0.1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',

    },
    inputMessage: {
        height: '60%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: width * 0.04,
        paddingLeft: 10,
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    send: {
        height: width * 0.12,
        width: width * 0.12,
        borderRadius: width * 0.3,
        backgroundColor: '#258E4A',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    boxMessage: {
        minHeight: undefined,
        maxHeight: undefined,
        width: width * 0.6,
        padding: 10,
    },
    boxMessageView: {
        minHeight: 70,
        maxHeight: undefined,
        width: width,

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
        height: width * 0.55,
        width: width * 0.55,
        borderRadius: ((width * 0.55) / 2),
        backgroundColor: '#258E4A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridControl: {
        width: '100%',
        height: width * 0.3,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    itemGridControl: {
        width: width * 0.2,
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: ((width * 0.2) / 2)
    },
    progressBar: {
        height: width * 0.02,
        backgroundColor: 'white',
        width: '50%'
    },
    indicadorProgress: {
        width: width * 0.05,
        height: width * 0.05,
        top: - ((width * 0.05) / 3),
        borderRadius: ((width * 0.05) / 2),
        backgroundColor: 'red'
    },
    viewTouchProgress: {
        height: width * 0.2,
        alignItems: "center",
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewLiVe: {
        width: width * 0.3,
        height: width * 0.1,
        borderRadius: ((width * 0.08) / 2),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    textLive: {
        color: 'white',
        fontSize: width * 0.04
    },
    text: {
        color: 'white',
        fontSize: width * 0.05,
        fontWeight: '400',

    },
    pointLive: {
        width: width * 0.03,
        height: width * 0.03,
        borderRadius: ((width * 0.03) / 2),
        backgroundColor: 'white'
    },
    stream: {
        left: width * 3,
        height: 50,
        width: 50,
        position: 'absolute'
    },
    gradeLine: {
        width: '60%',
        height: width * 0.004,
        backgroundColor: 'white'
    },
    scrollAuto: {
        height: width * 0.15,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSheet: {
        width: width,
        height: width * 0.2,
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: '#258E4A',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    containIconSheet: {
        width: '55%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    icontextHeader: {
        height: '100%',
        width: '30%',
        justifyContent: "space-around",
        alignItems: 'center',
        flexDirection: 'row'
    },

    headerModal: {
        alignItems: 'center',
        paddingVertical: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    item: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 10,
    },
    panelHandle: {
        width: 50,
        height: 7,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 4
    },
    contentContainerStyle: {
        padding: 16,
        backgroundColor: '#F3F4F9',
    },
    containerSocialMedia: {
        width: '80%',
        height: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    iconSocialMedia: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: (width * 0.14) / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    siteIcon: {
        width: width * 0.17,
        height: width * 0.17,
        borderRadius: (width * 0.17) / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }


});
export default styles;