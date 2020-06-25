import React, { useEffect, useState, useRef } from 'react';
import { View, ImageBackground, Dimensions, Image, Text, TextInput } from 'react-native';
import Stream from '../../component/PlayerStream';
import { Modalize } from 'react-native-modalize';
import 'react-native-gesture-handler';
import styles from './styles';
import moment from "moment";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { usePlayerStream, useOnlineUsers } from '../../Context/contextPlayer';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useMessages } from '../../Context/contextDatabase';
import Icon from '../../assets/icons/icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import ScrollName from './ScrollName';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface ITEM {
    id: string,
    createTimestamp: number,
    text: string
}

const Home: React.FC = () => {
    const navigation = useNavigation();
    const { play, setPlay } = usePlayerStream();
    const [namePlayPause, setNamePlayPause] = useState<string>('play');
    const [hearth, setHearth] = useState<boolean>(false);
    const [hearthName, setHearthName] = useState<string>('hearto');
    const [sendTextMessage, setSendTextMessage] = useState<string>('');
    const [stateSend, setStateSend] = useState<boolean>(false)
    const modalRef = useRef<Modalize>(null);
    const { online } = useOnlineUsers();
    const { messages } = useMessages();


    const onOpen = () => {
        modalRef.current?.open();
    };
    useEffect(() => { }, [online])

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (!user) {
                auth().signInAnonymously().then(() => {
                    console.log('User signed in anonymously');
                })
            }
        })
    }, []);

    function sendMessage() {
        if (sendTextMessage.length !== 0) {
            const DATA = {
                id: `${auth().currentUser?.uid}`,
                createTimestamp: Number(firestore.Timestamp.now().toMillis()),
                text: sendTextMessage,

            };
            firestore().collection('messages').add(DATA)
        }
        return finishSendMessage()
    }

    function finishSendMessage() {
        setSendTextMessage('');
    }

    function RenderMessage(item: ITEM, index: number) {
        if (item.id !== String(auth().currentUser?.uid)) {
            return (
                <View key={item.id} style={[styles.boxMessageView, { paddingTop: 10 }]}>
                    <View style={{ width: width - (width * 0.7), flexDirection: 'row-reverse' }}>
                        <Text style={{ left: 10, fontSize: width * 0.035, color: 'black' }}>{moment(Number(item.createTimestamp)).locale('pt-br').fromNow()}</Text>
                    </View>
                    <View style={[styles.boxMessage, { backgroundColor: '#228B22', left: 7, borderBottomRightRadius: 10, borderTopLeftRadius: 10 }]}>
                        <Text style={{ color: 'white', fontSize: width * 0.04 }}> {item.text}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View key={item.id} style={[styles.boxMessageView, { paddingTop: 10 }]}>
                <View style={[styles.boxMessage, { backgroundColor: '#E5E5E5', left: ((width - (width * 0.6)) - 7), borderBottomStartRadius: 9, borderTopRightRadius: 12 }]}>
                    <Text style={{ color: '#141414', fontSize: width * 0.04 }}>{item.text}</Text>
                </View>
                <View style={{ width: width, flexDirection: 'row-reverse' }}>
                    <Text style={{ left: 10, fontSize: width * 0.035, color: 'black' }}>{moment(Number(item.createTimestamp)).locale('pt-br').fromNow()}</Text>
                </View>
            </View>
        );
    }



    function handlePlayPause() {

        setPlay(!play);
        if (play === false) {
            setNamePlayPause('pause')
        } else {
            setNamePlayPause('play')
        }
    }

    function hanldleHearth() {

        setHearth(!hearth);
        if (hearthName === 'hearto') {
            setHearthName('heart')
        } else {
            setHearthName('hearto')
        }
    }
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
                <View style={styles.viewLiVe}>
                    <Text style={styles.textLive}>AO VIVO</Text>
                    <View style={styles.pointLive} />
                </View>

                <Image source={require('../../assets/logo1.png')} style={styles.logo} />


                <View style={styles.scrollAuto}>
                    <ScrollName />
                </View>
                <View style={styles.gradeLine} />
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
                        <Text style={styles.text}> Mensagens</Text>
                        <View style={[styles.containIconSheet, { flexDirection: 'row' }]}>
                            <View style={styles.icontextHeader}>
                                <Icon.MaterialIcons name={'visibility'} size={width * 0.09} />
                                <Text style={styles.text}>{online}</Text>
                            </View>
                            <View style={styles.icontextHeader}>
                                <Icon.AntDesign name={'heart'} size={width * 0.065} />
                                <Text style={styles.text}>{online}</Text>
                            </View>
                        </View>
                    </View>}
                snapPoint={width * 0.2}>

                <ImageBackground source={require('../../assets/background.jpg')} style={{ width: width, height: ((height - width * 0.15) - width * 0.2), justifyContent: 'space-between' }}>
                    <View style={{ width: width }} />
                    {/* <FlatList
                            style={{ flex: 1 }}
                            data={messages}
                            inverted
                            keyExtractor={(item: ITEM) => String(item.createTimestamp + item.text)}
                            renderItem={({ item, index }) => RenderMessage(item, index)}
                            ListHeaderComponent={()=><View style={{width: width, height: width*0.1}}/>}
                        /> */}
                    <View style={styles.InputChat}>
                        <TextInput
                            style={styles.inputMessage}
                            placeholder={'Digite sua mensagem...'}
                            value={sendTextMessage}
                            onChangeText={(e) => setSendTextMessage(e)}
                        />
                        <TouchableOpacity style={styles.send} activeOpacity={0.7} onPress={sendMessage}>
                            <Icon.FontAwesome name={'send'} color={'white'} size={width * 0.05} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modalize>
            <View style={styles.stream}><Stream /></View>
        </>
    );
}
export default Home;

//














