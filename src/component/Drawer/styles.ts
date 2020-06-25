import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#258E4A',


    },
    containerLogo: {
        width: '100%',
        height: height * 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradeLine: {
        flex: 1,
        backgroundColor: 'white',
        height: width * 0.005
    },
    gradeL: {
        width: '80%',
        backgroundColor: 'white',
        height: width * 0.005
    },
    contain: {
        width: '100%',
        height: height * 0.4,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    itemNavigator: {
        width: '100%',
        height: height * 0.08,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: width * 0.08,
      
        alignItems:'center'
    },
    logo: {
        height: width * 0.4,
        width: width * 0.4,
        borderRadius: ((width * 0.4) / 2),
        backgroundColor: '#258E4A',
        justifyContent: 'center',
        alignItems: 'center'
    },
   IconN: {
        width: width * 0.07,
        height: width * 0.07,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textLive: {
        color: 'white',
        fontSize: width * 0.04
    },
    espaceName:{
        height: 1,
        width: width*0.02
    }

})
export default styles;