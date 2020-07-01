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
    containerViewInput:{
        width: '70%',
        height: width*0.2,
        justifyContent:'space-evenly',
    },
    input:{
        width: '100%',
        height: width*0.12,
        backgroundColor:'#E5E5E5',
        paddingHorizontal: 1,
        borderWidth: width*0.002,
        borderColor:'grey',
        paddingLeft: 5,
        borderRadius:((width*0.05)/2)
    },
    submit:{
        width: width*0.7,
        height: width*0.18,
        borderWidth: width*0.001,
        borderColor:'#707070',
        elevation: 2,
        shadowOffset: { width: 5, height: 5},
        shadowColor: "#707070",
        shadowOpacity: 0.5,
        shadowRadius: ((width*0.05)/2),
        borderRadius:((width*0.05)/2),
        backgroundColor:'#258E4A',
        justifyContent:'center',
        alignItems:'center'
    },
    textSubmit:{
        color: 'white',
        fontSize: width * 0.06
    }
});
export default styles;