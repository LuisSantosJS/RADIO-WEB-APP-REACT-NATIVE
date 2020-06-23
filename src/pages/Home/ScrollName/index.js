import React from 'react';
import AutoScrolling from 'react-native-auto-scrolling';
import styles from './styles';
import {
    View,
    Text
} from 'react-native';

const ScrollName = () => {
    return (
        <AutoScrolling styles={styles.scrollAuto}>
            <Text style={styles.textLive}>NOME DA MUSICA - ABC</Text>
        </AutoScrolling>
    );
}


export default ScrollName;