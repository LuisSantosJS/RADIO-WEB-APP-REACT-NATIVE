import React,{useEffect} from 'react';
import AutoScrolling from 'react-native-auto-scrolling';
import styles from './styles';
import {
    View,
    Text
} from 'react-native';
import { useNameMusic } from '../../../Context/contextPlayer';

const ScrollName = () => {
    const { infoMusic } = useNameMusic();
    useEffect(()=>{},[infoMusic])
    return (
        <AutoScrolling styles={styles.scrollAuto}>
            <Text style={styles.textLive}>{infoMusic}</Text>
        </AutoScrolling>
    );
}


export default ScrollName;