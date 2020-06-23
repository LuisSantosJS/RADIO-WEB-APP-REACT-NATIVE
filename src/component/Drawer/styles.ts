import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#258E4A',


    },
    containerLogo:{
        width: '100%',
        height: width*0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradeLine:{
        flex: 1,
        backgroundColor: 'white',
        height: width*0.005
    }

})
export default styles;