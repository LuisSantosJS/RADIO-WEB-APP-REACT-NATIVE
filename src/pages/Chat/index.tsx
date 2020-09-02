import React, { useState, useEffect, } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    Animated,
    Platform,
    Dimensions,
    TextInput,
    ImageBackground
} from 'react-native';
import io from "socket.io-client";
import Icon from '../../assets/icons/icons';
import Constants from 'expo-constants';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import api from '../../services/api';
import { useUserID, useNameUser, useCourse } from '../../Context/contextPlayer';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation, DrawerActions } from '@react-navigation/native';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface ITEM {
    id: number,
    userID: number,
    name: string,
    msm: string,
    course: string
}

const Chat: React.FC = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState<ITEM[]>([]);
    const { name } = useNameUser();
    const { select } = useCourse();
    const { userId } = useUserID();
    const [sendTextMessage, setSendTextMessage] = useState<string>('');
    const socket = io("http://radiocampusapi.com.br");
    useEffect(() => {
        api.get('/messages').then(res => {
            setMessages(res.data.res);
        })
        function loadMessages() {
            socket.on('chat', (msg: []) => {
                setMessages(msg)
                console.log(msg)
            });
        }
        loadMessages();
    }, [])


    function submitText() {
        if (userId === 0) {
            Toast.showWithGravity('Faça login primeiro!', Toast.LONG, Toast.TOP);
            return navigation.navigate('Auth')
        }
        if (sendTextMessage.length !== 0) {
            console.log('emit')
            socket.emit('chat', {
                name: name,
                userID: userId,
                msm: sendTextMessage,
                course: select
            });
            setSendTextMessage('');
        }
    }
    useEffect(() => { }, [messages])
    function RenderMessage(item: ITEM, index: number) {
        if (item.userID !== userId) {
            return (
                <View key={index} style={{ width: width, minHeight: width * 0.12, maxHeight: undefined, flexDirection: 'row', paddingBottom: width * 0.05 }}>
                    <View style={{ height: '100%', width: '60%', flexDirection: 'row', paddingHorizontal: width * 0.02 }}>
                        <View style={{ backgroundColor: 'forestgreen', padding: width * 0.02, justifyContent: 'center', borderTopRightRadius: width * 0.021, borderBottomLeftRadius: width * 0.021 }}>
                            <Text style={{ color: 'white', fontSize: width * 0.04 }}>{item.name}: {item.msm}</Text>
                        </View>
                    </View>
                </View>
            );
        }
        else {
            return (
                <View key={index} style={{ width: width, minHeight: width * 0.12, maxHeight: undefined, flexDirection: 'row-reverse', paddingBottom: width * 0.05 }}>
                    <View style={{ height: '100%', width: '60%', flexDirection: 'row-reverse', paddingHorizontal: width * 0.02 }}>
                        <View style={{ backgroundColor: '#E5E5E5', padding: width * 0.02, justifyContent: 'center', borderTopLeftRadius: width * 0.021, borderBottomRightRadius: width * 0.021 }}>
                            <Text style={{ color: 'black', fontSize: width * 0.04 }}>{item.msm}</Text>
                        </View>
                    </View>
                </View>
            );
        }

    }
    return (
        <>
            <View style={{ width: '100%', height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0, backgroundColor: '#258E4A', }} />
            <View style={styles.header}>
                <TouchableOpacity style={styles.ViewIconHeader} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/menu.png')} />
                </TouchableOpacity>
                <Text style={styles.textLive}>CHAT AO VIVO</Text>
                <TouchableOpacity style={styles.ViewIconHeader}>
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>
            <ImageBackground source={require('../../assets/background.jpg')} style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    bounces={false}
                    onEndReachedThreshold={0.1}
                    style={{ flex: 1 }}
                    data={messages}
                    inverted
                    keyExtractor={(item: ITEM) => String(item.id)}
                    renderItem={({ item, index }) => RenderMessage(item, index)}
                    ListHeaderComponent={() => <View style={{ width: width, height: width * 0.1 }} />}
                    ListFooterComponent={() => <View style={{ width: width, height: width * 0.1 }} />}
                />
                <View style={styles.InputChat}>
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
            </ImageBackground>

        </>

    );
}
export default Chat;