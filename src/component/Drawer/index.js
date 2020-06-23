import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

import { DrawerContentScrollView } from '@react-navigation/drawer'


export const DrawerContent = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.containerLogo}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                        Logo
                    </Text>
                </View>
                <View style={styles.gradeLine} />
                <View style={styles.contain}>
                    <TouchableOpacity style={styles.itemNavigator} activeOpacity={0.8}
                        onPress={() => {
                            props.navigation.navigate('Home')
                        }}>
                        <Image
                            style={[styles.IconN]} resizeMode={'contain'}
                            source={require('../../assets/home.png')}
                        />
                        <View style={styles.espaceName} />
                        <Text style={styles.textLive}>HOME</Text>
                    </TouchableOpacity>
                    <View style={styles.gradeL} />
                    <TouchableOpacity style={styles.itemNavigator} activeOpacity={0.8}
                        onPress={() => {
                            props.navigation.navigate('QueriesMusic')
                        }}>
                        <Image
                            style={[styles.IconN]} resizeMode={'contain'}
                            source={require('../../assets/audio.png')}
                        />
                        <View style={styles.espaceName} />
                        <Text style={styles.textLive}>PEDIR MUSÍCA</Text>
                    </TouchableOpacity>
                    <View style={styles.gradeL} />
                    <TouchableOpacity style={styles.itemNavigator} activeOpacity={0.8}
                        onPress={() => {
                            props.navigation.navigate('Info')
                        }} >
                        <Image
                            style={[styles.IconN]} resizeMode={'contain'}
                            source={require('../../assets/sobre.png')}
                        />
                        <View style={styles.espaceName} />
                        <Text style={styles.textLive}>SOBRE</Text>
                    </TouchableOpacity>
                    <View style={styles.gradeL} />
                </View>



            </DrawerContentScrollView>
        </View>
    );
}