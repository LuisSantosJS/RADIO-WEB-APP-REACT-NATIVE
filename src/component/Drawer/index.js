import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

import { DrawerContentScrollView } from '@react-navigation/drawer'


export const DrawerContent = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.containerLogo}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        Logo
                    </Text>
                </View>
                <View style={styles.gradeLine}/>



            </DrawerContentScrollView>
        </View>
    );
}