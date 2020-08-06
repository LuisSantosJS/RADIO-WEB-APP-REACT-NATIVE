import React from 'react';

import styles from './styles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import {
    View,
    Button,
    Dimensions,
    Image,
    Platform,
    Linking,
    Text,
    TouchableOpacity
} from 'react-native';
const Info: React.FC = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#258E4A', }} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                </TouchableOpacity>
                <Text style={styles.textLive}>RADIO CAMPUS IFAC</Text>
                <TouchableOpacity style={styles.ViewIconHeader} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Image source={require('../../assets/logo1.png')} style={styles.logo} />
                <Text style={styles.copyrigth}>© 2020 RADIO CAMPUS IFAC</Text>
                <View style={styles.gradeLine} />

                <View style={{ width: '100%', height: '8%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.textTitleInfo}>Contato:</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:querytena@gmail.com')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>querytena@gmail.com</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.gradeLine} />

                <View style={{ width: '100%', height: '35%', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.textTitleInfo}>Equipe</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:branaemilly@gmail.com')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>Emilly Brana - Design</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:isalves1002@gmail.com')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>Ismael Alves - Desenvolvedor/Locutor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:luizflpcapi@gmail.com')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>Luiz Felipe - Desenvolvedor/Locutor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:dasilvasantosluisfelipe@gmail.com')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>Luis Santos - Desenvolvedor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:rodrigo.souza@ifac.edu.br')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>Rodrigo Souza - Coordenador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:wydemairomsilva@gmail.com')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>Will Silva - Desenvolvedor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL('mailto:yvannalves6@gmail.com')}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.emailText}>Yvanna Alves - Design</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default Info;