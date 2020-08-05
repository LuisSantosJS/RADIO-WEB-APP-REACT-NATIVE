import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
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
        height: width * 0.55,
        width: width * 0.55,
        borderRadius: ((width * 0.55) / 2),
        backgroundColor: '#258E4A',
        justifyContent: 'center',
        alignItems: 'center'
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
    InputChat:{
        width: '100%',
        height: height*0.1,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-around',
 
    },
    inputMessage:{
        height: '70%',
        width: '80%',
        backgroundColor:'white',
        borderRadius: width * 0.04,
        paddingLeft: 10,
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    send:{
        height: width*0.12,
        width: width*0.12,
        borderRadius:width * 0.3,
        backgroundColor:'#258E4A',
        alignItems: 'center',
        justifyContent:'center',
        elevation: 3,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    boxMessage: {
        minHeight: undefined,
        maxHeight: undefined,
        width: width*0.6,
        padding: 10,
    },
    boxMessageView: {
        minHeight: 70,
        maxHeight: undefined,
        width: width,

    },
});
export default styles;