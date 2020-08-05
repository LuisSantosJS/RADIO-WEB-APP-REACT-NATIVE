import React, { useEffect, useRef } from 'react';
import { usePlayerStream, useNameMusic } from '../../Context/contextPlayer';
import TrackPlayer from 'react-native-track-player';



const Stream = () => {
    const { play, setPlay } = usePlayerStream();
    const Live = useRef().current;
    const { infoMusic } = useNameMusic();
    useEffect(() => {
        async function loadMusic() {
            TrackPlayer.setupPlayer().then(() => {
                TrackPlayer.add({
                    id: 'corredor',
                    url: "https://player.xcast.com.br/proxy/11978",
                    title: `${infoMusic}`,
                    artist: 'AO VIVO',
                    artwork: 'https://firebasestorage.googleapis.com/v0/b/radio-corredor-ifac.appspot.com/o/logosFirewes.png?alt=media&token=f79c76e1-9fac-4a87-9742-00e9469eff10'
                }).then(() => {
                    TrackPlayer.play();
                })
            })
        }
        loadMusic();

    }, [])
    return (
        <></>
    );
}

export default Stream;

