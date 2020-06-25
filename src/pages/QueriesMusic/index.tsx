import React, { useState, useEffect } from 'react';

import styles from './styles';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import {
    View,
    TextInput,
    Image,
    Text,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import database from '@react-native-firebase/database';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import KeyboardH from '../../Functions/Keyboard';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const QueriesMusic: React.FC = () => {
    const navigation = useNavigation();
    const [isVisibleSubmit, setIsVisibleSubmit] = useState<boolean>(true);
    const [name, setName] = useState<string>('');
    const [music, setMusic] = useState<string>('');
    const [dedicated, setDedicated] = useState<string>('');
    const keyboardHeigth = KeyboardH();
    useEffect(() => {

    }, [keyboardHeigth]);

    function handleKeyboardHide() {
        setIsVisibleSubmit(true);
        return true
    };
    function handleKeyboardShow() {
        setIsVisibleSubmit(false);
        return true
    }

    async function addMusic() {
        if (name.length == 0) {
            return Toast.show('Insira seu nome!', Toast.LONG);
        }
        if (music.length == 0) {
            return Toast.show('Insira uma musica!', Toast.LONG);
        }
        const DATA = {
            authorID: `${auth().currentUser?.uid}`,
            author: name,
            music,
            dedicated,
            timestamp: database.ServerValue.TIMESTAMP,
            reproduced: false

        }
        const newUserRef = database().ref('music').push();
        console.log('New record key:', newUserRef.key);
        await newUserRef.set(DATA);
        return finisAddMusic();
    }
    function finisAddMusic(){
        setName('');
        setDedicated('');
        setMusic('');
        return Toast.show('Pedido enviado!', Toast.LONG);
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', handleKeyboardShow)
        Keyboard.addListener('keyboardDidHide', handleKeyboardHide)
        return () => {
            Keyboard.removeListener('keyboardDidHide', handleKeyboardHide)
            Keyboard.removeListener('keyboardDidShow', handleKeyboardShow)
        };
    }, []);

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                </TouchableOpacity>
                <Text style={styles.textLive}>RADIO CORREDOR IFAC</Text>
                <TouchableOpacity style={styles.ViewIconHeader} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {isVisibleSubmit &&
                    <Text style={[styles.textHeader]}>Pedir Música</Text>
                }


                <View style={[styles.containerViewInput]}>
                    <Text style={styles.textLive}>Nome</Text>
                    <TextInput style={styles.input}
                        placeholder={'Maria Joaquina'}
                        onTouchStart={() => setIsVisibleSubmit(false)}
                        value={name}
                        onChangeText={(e) => setName(e)}
                    />
                </View>
                <View style={[styles.containerViewInput]}>
                    <Text style={styles.textLive}>Nome da música</Text>
                    <TextInput style={styles.input}
                        placeholder={'Gostava tanto de você - Tim Maia'}
                        onTouchStart={() => setIsVisibleSubmit(false)}
                        value={music}
                        onChangeText={(e) => setMusic(e)}
                    />
                </View>

                <View style={[styles.containerViewInput]}>
                    <Text style={styles.textLive}>Dedicada a alguém?</Text>
                    <TextInput style={styles.input}
                        placeholder={'Luis Santos'}
                        onTouchStart={() => setIsVisibleSubmit(false)}
                        value={dedicated}
                        onChangeText={(e) => setDedicated(e)}
                    />
                </View>
                {isVisibleSubmit &&
                    <TouchableOpacity activeOpacity={0.4} style={styles.submit} onPress={addMusic}>
                        <Text style={styles.textSubmit}>Enviar</Text>
                    </TouchableOpacity>}
                <View style={{ width: '100%', height: keyboardHeigth }} />

            </View>
        </>
    );
}

export default QueriesMusic;
//<ActivityIndicator size={'large'} color={'white'} />