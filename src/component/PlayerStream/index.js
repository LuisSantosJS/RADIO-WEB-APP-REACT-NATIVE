import React, { useEffect, useRef } from 'react';
import { LivePlayer } from "react-native-live-stream";
import { usePlayerStream, useVolumePlayer,useNameMusic } from '../../Context/contextPlayer';
import MusicControl from 'react-native-music-control';



const Stream = () => {
    const { play, setPlay } = usePlayerStream();
    const Live = useRef().current;
    const {infoMusic} = useNameMusic();
    useEffect(() => {

        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)
        MusicControl.enableControl('stop', true)
        MusicControl.enableControl('closeNotification', true, { when: 'never' })

    }, []);


    useEffect(() => {
        MusicControl.enableBackgroundMode(true);
        MusicControl.on('play', () => {
            setPlay(!play);
        })
        MusicControl.on('pause', () => {
            setPlay(!play);
        })
        MusicControl.on('stop', () => {
            setPlay(false)
        })
        MusicControl.setNowPlaying({
            title: 'AO VIVO',
            artwork: 'https://firebasestorage.googleapis.com/v0/b/querytenacovid19.appspot.com/o/IMG-20200213-WA0084.jpg?alt=media&token=2bb25723-97cd-4d89-acaa-f99dfc5c4144', // URL or RN's image require()
            artist: `${infoMusic}`,
            genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
            duration: 294, 
            description: 'RADIO WEB', 
            color: 0x30AE5D,
            date: '1983-01-02T00:00:00Z', 
            rating: 32, 
            notificationIcon: 'https://firebasestorage.googleapis.com/v0/b/querytenacovid19.appspot.com/o/IMG-20200213-WA0084.jpg?alt=media&token=2bb25723-97cd-4d89-acaa-f99dfc5c4144' // Android Only (String), Android Drawable resource name for a custom notification icon
        });

        if (play) {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING
            })
        } else {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PAUSED
            })
        }
    }, [play])



    return (
        <LivePlayer source={{ uri: "http://199.101.98.82:8238/;?type=http&nocache=2776970312" }}
            style={{ flex: 1 }}
            paused={false}
            ref={Live}
            muted={!play}
            bufferTime={300}
            maxBufferTime={1000}
            resizeMode={"contain"}
            onLoading={() => { }}
            onLoad={() => { }}
            onEnd={() => { }}
        />
    );
}

export default Stream;

