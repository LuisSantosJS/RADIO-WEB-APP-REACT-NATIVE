import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './styles';
import Icon from '../../assets/icons/icons';
import Constants from 'expo-constants';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import {
    View,
    TextInput,
    Image,
    Text,
    Platform,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useSavedUser, useUserID, useCourse, useNameUser } from '../../Context/contextPlayer';
import KeyboardH from '../../Functions/Keyboard';
import { Dimensions } from 'react-native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const QueriesMusic: React.FC = () => {
    const navigation = useNavigation();
    const [isVisibleSubmit, setIsVisibleSubmit] = useState<boolean>(true);
    const { name } = useNameUser();
    const { select } = useCourse();
    const [music, setMusic] = useState<string>('');
    const [dedicated, setDedicated] = useState<string>('');
    const keyboardHeigth = KeyboardH();
    const { userSaved } = useSavedUser();
    const { userId } = useUserID();
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
        if (userId === 0) {
            Toast.showWithGravity('Faça login primeiro!', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth')
        }
        if (userSaved === false) {
            Toast.showWithGravity('Precisa se cadastrar primeiro!', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth');
        }
        if (music.length == 0) {
            return Toast.showWithGravity('Insira uma musica!', Toast.LONG, Toast.TOP);
        }

        const DATA = {
            userID: userId,
            dedicated,
            music,
            name,
            course: select,
            reproduced: false
        }
        api.post('/musics/create', DATA).then((res) => {
            console.log(res.data);
            return finisAddMusic();
        }).catch((res) => {
            console.log(res.data);
            Toast.show('Erro no envio!', Toast.LONG);
        })
    }
    function finisAddMusic() {
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
                {isVisibleSubmit &&
                    <Text style={[styles.textHeader]}>Pedir Música</Text>
                }
                <View style={[styles.containerViewInput]}>
                    {/* <Text style={styles.textLive}>Nome</Text> */}
                    <View style={[styles.input, { flexDirection: 'row' }]}>
                        <View style={{ width: '15%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon.FontAwesome name={'music'} size={width * 0.07} color={isVisibleSubmit ? 'black' : 'green'} />
                        </View>
                        <TextInput
                            style={{ height: '100%', width: '85%' }}
                            placeholder={'Nome da música'}
                            onTouchStart={() => setIsVisibleSubmit(false)}
                            value={music}
                            onChangeText={(e) => setMusic(e)}
                        />
                    </View>
                </View>
                <View style={[styles.containerViewInput]}>
                    {/* <Text style={styles.textLive}>Nome</Text> */}
                    <View style={[styles.input, { flexDirection: 'row' }]}>
                        <View style={{ width: '15%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon.MaterialCommunityIcons name={'account-multiple'} size={width * 0.07} color={isVisibleSubmit ? 'black' : 'green'} />
                        </View>
                        <TextInput
                            style={{ height: '100%', width: '85%' }}
                            placeholder={'Dedicada a alguém?'}
                            onTouchStart={() => setIsVisibleSubmit(false)}
                            value={dedicated}
                            onChangeText={(e) => setDedicated(e)}
                        />
                    </View>
                </View>
                {isVisibleSubmit && <>
                    <TouchableOpacity activeOpacity={0.4} style={styles.submit} onPress={addMusic}>
                        <Text style={styles.textSubmit}>Enviar</Text>
                    </TouchableOpacity></>}
                {!userSaved &&
                    <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
                        <Text style={[styles.textLive, { color: 'white' }]}>Você precisa se cadastrar</Text>
                    </TouchableOpacity>}

            </View>
        </>
    );
}

export default QueriesMusic;
//<ActivityIndicator size={'large'} color={'white'} />