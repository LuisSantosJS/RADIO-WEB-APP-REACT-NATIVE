import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    scrollAuto:{
        height: width * 0.15,
        alignItems:'center',
        justifyContent:'center',
    }

});
export default styles;