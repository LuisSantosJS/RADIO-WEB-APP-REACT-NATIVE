import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Image, Text, TouchableOpacity, Platform, Linking } from 'react-native';
import 'react-native-gesture-handler';
import api from '../../services/api';
import styles from './styles';
import TrackPlayer from 'react-native-track-player';
import Constants from 'expo-constants';
import { usePlayerStream, useOnlineUsers, useNameMusic, useUserID, useLikes, usePlayPause, useCapaMusica } from '../../Context/contextPlayer';
import Icon from '../../assets/icons/icons';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { Modalize } from 'react-native-modalize';
import ScrollName from '../../component/ScrollName';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import KeyboardH from '../../Functions/Keyboard';
interface ITEM {
    id: number,
    userID: number,
    name: string,
    msm: string,
    course: string
}

const Home: React.FC = () => {
    const navigation = useNavigation();
    const modalRef = useRef<Modalize>(null);
    const bottomSheetRef = React.useRef<ScrollBottomSheet<any> | null>(null);
    const { play, setPlay } = usePlayerStream();
    const { userId } = useUserID();
    const KeyboardHeight = KeyboardH();
    const { namePlayPause, setNamePlayPause } = usePlayPause();
    const [hearth, setHearth] = useState<boolean>(false);
    const [hearthName, setHearthName] = useState<string>('hearto');
    const { online } = useOnlineUsers();
    const { infoMusic, setInfoMusic } = useNameMusic();
    const { numberLikes } = useLikes();
    const [sendTextMessage, setSendTextMessage] = useState<string>('');
    const { capaMusica } = useCapaMusica();

    useEffect(() => {
        TrackPlayer.addEventListener('remote-play', () => setNamePlayPause('pause'));
        TrackPlayer.addEventListener('remote-pause', () => setNamePlayPause('play'));
        async function loadMusic() {
            TrackPlayer.setupPlayer().then(() => {
                TrackPlayer.add({
                    id: 'corredor',
                    url: "https://player.xcast.com.br/proxy/11978",
                    title: `RADIO CAMPUS IFAC`,
                    artist: 'AO VIVO',
                    artwork: 'https://firebasestorage.googleapis.com/v0/b/radio-corredor-ifac.appspot.com/o/Icon-marketing-1024x1024.png?alt=media&token=9cccf32f-ece0-49d5-bdd9-47ca90889dc0'
                }).then(() => {
                    TrackPlayer.updateOptions({
                        ratingType: TrackPlayer.RATING_5_STARS,
                        stopWithApp: false,
                        capabilities: [
                            TrackPlayer.CAPABILITY_PLAY,
                            TrackPlayer.CAPABILITY_PAUSE,
                            TrackPlayer.CAPABILITY_STOP
                        ],
                        compactCapabilities: [
                            TrackPlayer.CAPABILITY_PLAY,
                            TrackPlayer.CAPABILITY_PAUSE
                        ]
                    });
                })
            })
        }
        loadMusic();



    }, [])




    const onOpen = () => {
        modalRef.current?.open();
    };
    useEffect(() => {

    }, [online])
    useEffect(() => {
        // bottomSheetRef.current?.snapTo(1);
    }, [])
    useEffect(() => {
        if (userId !== 0) {
            api.post('/users/like/status', {
                userID: userId
            }).then(res => {
                if (res.data.like == 1) {
                    setHearthName('heart')
                }
                else {
                    setHearthName('hearto')
                }
            })
        }
    }, [userId])

    function handlePlayPause() {

        setPlay(!play);
        if (play === false) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();

        }
    }

    function hanldleHearth() {
        if (userId === 0) {
            Toast.showWithGravity('Faça login primeiro!', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth')
        }
        setHearth(!hearth);
        if (hearthName === 'hearto') {
            setHearthName('heart');
            api.post('/users/like/create', {
                userID: userId,
                value: true
            })
        } else {
            setHearthName('hearto');
            api.post('/users/like/create', {
                userID: userId,
                value: false
            })
        }

    }

    function openFacebook() {
        Linking.canOpenURL("fb://profile/dasilvasantosluisfelipe/about").then(supported => {
            if (supported) {
                return Linking.openURL('fb://profile/dasilvasantosluisfelipe/about')
            }
            return Linking.openURL("https://www.facebook.com/dasilvasantosluisfelipe");

        })
    }
    function openInstagram(){
        Linking.canOpenURL("instagram://user?username=luissantos.tsx").then(supported => {
            if(supported){
                return  Linking.openURL('instagram://user?username=luissantos.tsx')
            }
            return Linking.openURL('http://instagram.com/_u/luissantos.tsx');
        });

    }


    function onOpenChat() {
        if (userId === 0) {
            Toast.showWithGravity('Faça login primeiro!', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth')
        }
        navigation.navigate('Chat');
    }

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
                <View style={styles.viewLiVe}>
                    <Text style={styles.textLive}>AO VIVO</Text>
                    <View style={styles.pointLive} />
                </View>

                <Image source={capaMusica !== 'nulo' ? { uri: capaMusica } : require('../../assets/logo1.png')} style={styles.logo} />


                <View style={styles.scrollAuto}>
                    <ScrollName />
                </View>
                <View style={styles.containerSocialMedia} >
                    <TouchableOpacity onPress={() => openInstagram()} style={styles.iconSocialMedia}>
                        <Icon.Ionicons name='logo-instagram' size={width * 0.1} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.siteIcon}>
                        <Icon.MaterialCommunityIcons name='web' size={width * 0.12} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openFacebook()} style={styles.iconSocialMedia}>
                        <Icon.Ionicons name='logo-facebook' size={width * 0.09} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={[styles.gridControl, { backgroundColor: '#30AE5D' }]}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.itemGridControl} onPress={hanldleHearth}>
                        <Icon.AntDesign name={hearthName} color={'white'} size={width * 0.12} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.itemGridControl, { backgroundColor: 'white' }]} onPress={handlePlayPause}>
                        <Icon.MaterialCommunityIcons name={play == false ? 'play' : 'pause'} color={'#30AE5D'} size={width * 0.12} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.itemGridControl} onPress={() => onOpen()}>
                        <Icon.Entypo name={'chat'} color={'white'} size={width * 0.12} />
                    </TouchableOpacity>
                </View>
            </View>
            <Modalize
                ref={modalRef}
                HeaderComponent={() =>
                    <View style={styles.headerSheet} >
                        <Text style={styles.text}> CHAT AO VIVO</Text>
                        <View style={[styles.containIconSheet, { flexDirection: 'row' }]}>
                            <View style={styles.icontextHeader}>
                                <Icon.MaterialIcons name={'visibility'} color={'white'} size={width * 0.09} />
                                <Text style={styles.text}>{Number(online)}</Text>
                            </View>
                            <View style={styles.icontextHeader}>
                                <Icon.AntDesign name={'heart'} color={'white'} size={width * 0.065} />
                                <Text style={styles.text}>{numberLikes}</Text>
                            </View>

                            <View style={styles.icontextHeader}>
                                <TouchableOpacity onPress={onOpenChat}>
                                    <Icon.Entypo name={'chat'} color={'white'} size={width * 0.07} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>}
                snapPoint={width * 0.2}
                modalHeight={width * 0.2} >
            </Modalize>

        </>
    );
}
export default Home;













{/* <KeyboardAwareScrollView>
                    <View style={[styles.InputChat]}>
                        <TextInput
                            style={styles.inputMessage}
                            placeholder={'Digite sua mensagem...'}
                            value={sendTextMessage}
                            onChangeText={(e) => setSendTextMessage(e)}
                        />
                        <TouchableOpacity style={styles.send} activeOpacity={0.7} onPress={submitText}>
                            <Icon.FontAwesome name={'send'} color={'white'} size={width * 0.05} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView> */}


            //     <View style={styles.headerModal}>
            //     <View style={styles.panelHandle} />
            // </View>
            // <View style={styles.headerSheet} >
            //     <Text style={styles.text}> Mensagens</Text>
            //     <View style={[styles.containIconSheet, { flexDirection: 'row' }]}>
            //         <View style={styles.icontextHeader}>
            //             <Icon.MaterialIcons name={'visibility'} color={'white'} size={width * 0.09} />
            //             <Text style={styles.text}>{online}</Text>
            //         </View>
            //         <View style={styles.icontextHeader}>
            //             <Icon.AntDesign name={'heart'} color={'white'} size={width * 0.065} />
            //             <Text style={styles.text}>{numberLikes}</Text>
            //         </View>
            //         <View style={styles.icontextHeader}>
            //             <TouchableWithoutFeedback onPress={() => bottomSheetRef.current?.snapTo(1)}>
            //                 <Icon.Entypo name={'chat'} color={'white'} size={width * 0.07} />
            //             </TouchableWithoutFeedback>
            //         </View>
            //     </View>
            // </View>