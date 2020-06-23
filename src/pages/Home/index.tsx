import React, { useEffect, useState } from 'react';
import { View, Button, Dimensions, Image, Text } from 'react-native';
import Stream from '../../component/PlayerStream';
import styles from './styles';
import { usePlayerStream, useVolumePlayer } from '../../Context/contextPlayer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../../assets/icons/icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import VolumeControl from "react-native-volume-control";
import Slider from '@react-native-community/slider';
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Home: React.FC = () => {
    const navigation = useNavigation();
    const { play, setPlay } = usePlayerStream();
    const { volume, setVolume } = useVolumePlayer();
    const [namePlayPause, setNamePlayPause] = useState<string>('play');
    const [like, setLike] = useState<boolean>(false);
    const [likeName, setLikeName] = useState('like2');
    const [hearth, setHearth] = useState<boolean>(false);
    const [hearthName, setHearthName] = useState<string>('hearto');

    function handlePlayPause() {
        setPlay(!play);
        if (play === false) {
            setNamePlayPause('pause')
        } else {
            setNamePlayPause('play')
        }
    }
    function handleLike() {
        setLike(!like);
        if (likeName === 'like2') {
            setLikeName('like1')
        } else {
            setLikeName('like2')
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
                <TouchableOpacity style={styles.ViewIconHeader} >
                    <Image resizeMode={"contain"} style={styles.iconHeader} source={require('../../assets/share.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={styles.viewLiVe}>
                    <Text style={styles.textLive}>
                        AO VIVO
                    </Text>
                    <View style={styles.pointLive} />
                </View>

                <View style={styles.logo} >
                    <Text style={styles.textLive}>
                        LOGO
                    </Text>
                </View>
                <Text style={styles.textLive}>NOME DA MUSICA - ABC</Text>
                <View style={styles.viewTouchProgress}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.itemGridControl}>
                        <Icon.MaterialCommunityIcons name={'volume-medium'} color={'white'} size={width * 0.1} />
                    </TouchableOpacity>

                    <View style={{ width: '60%', height: 1 }} />


                    <TouchableOpacity activeOpacity={0.7} style={styles.itemGridControl}>
                        <Icon.MaterialCommunityIcons name={'volume-high'} color={'white'} size={width * 0.1} />
                    </TouchableOpacity>
                </View>

                <View style={styles.gridControl}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.itemGridControl} onPress={hanldleHearth}>
                        <Icon.AntDesign name={hearthName} color={'white'} size={width * 0.12} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.itemGridControl, { backgroundColor: 'white' }]} onPress={handlePlayPause}>
                        <Icon.MaterialCommunityIcons name={play == false ? 'play' : 'pause'} color={'#30AE5D'} size={width * 0.12} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.itemGridControl} onPress={handleLike}>
                        <Icon.AntDesign name={likeName} color={'white'} size={width * 0.12} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.stream}><Stream /></View>
        </>
    );
}
export default Home;

//














