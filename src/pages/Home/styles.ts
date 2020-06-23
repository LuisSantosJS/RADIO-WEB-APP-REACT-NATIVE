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
        alignItems:'center',
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
        justifyContent:'center',
        alignItems:'center'
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
        alignContent:'center',
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
        flexDirection:'row',
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
    pointLive: {
        width: width * 0.03,
        height: width * 0.03,
        borderRadius: ((width * 0.03) / 2),
        backgroundColor: 'white'
    },
    stream:{
        left: width*3,
        height: 50,
        width: 50,
        position:'absolute'
    },
    gradeLine:{
        width: '60%',
        height: width*0.004,
        backgroundColor:'white'
    },
    scrollAuto:{
        height: width * 0.15,
        width: '50%',
        alignItems:'center',
        justifyContent:'center',
    }
});
export default styles;