import React from 'react';

import styles from './styles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { View, Button, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
const Info: React.FC = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                </TouchableOpacity>
                <Text style={styles.textLive}>RADIO WEB</Text>
                <TouchableOpacity style={styles.ViewIconHeader} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>

            </View>
        </>
    );
}

export default Info;