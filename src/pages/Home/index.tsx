import React, { useEffect, useState, useRef } from 'react';
import { View, ImageBackground, Dimensions, Image, Text, TextInput, Animated } from 'react-native';
import Stream from '../../component/PlayerStream';
import { Modalize } from 'react-native-modalize';
import 'react-native-gesture-handler';
import styles from './styles';
import moment from "moment";

import { usePlayerStream, useOnlineUsers, useNameMusic } from '../../Context/contextPlayer';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Icon from '../../assets/icons/icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import ScrollName from '../../component/ScrollName';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;



const Home: React.FC = () => {
    const navigation = useNavigation();
    const { play, setPlay } = usePlayerStream();
    const [namePlayPause, setNamePlayPause] = useState<string>('play');
    const [hearth, setHearth] = useState<boolean>(false);
    const [hearthName, setHearthName] = useState<string>('hearto');
    const modalRef = useRef<Modalize>(null);
    const { online, setOnline } = useOnlineUsers();
    const { infoMusic, setInfoMusic } = useNameMusic();





    const onOpen = () => {
        modalRef.current?.open();
    };
    useEffect(() => { }, [online])


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
                <Text style={styles.textLive}>THE STUDENT VOICE</Text>
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

                            <View style={styles.icontextHeader}>
                                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                                    <Icon.Entypo name={'chat'} color={'white'} size={width * 0.07} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>}
                snapPoint={width * 0.2}
                modalHeight={width * 0.2} >
            </Modalize>
            <View style={styles.stream}><Stream /></View>
        </>
    );
}
export default Home;

//














