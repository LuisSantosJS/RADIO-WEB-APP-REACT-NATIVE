import React, { createContext, useState, useContext, useEffect } from 'react';


type ContextType = {
    play: boolean;
    setPlay: (value: boolean) => void;
    infoMusic: string;
    setInfoMusic: (value: string) => void;
    online: string;
    setOnline: (value: string) => void;

};

const ContextApp = createContext<ContextType>({
    play: false,
    setPlay: (value: boolean) => { },
    infoMusic: '',
    setInfoMusic: (value: string) => { },
    online: '',
    setOnline: (value: string) => { },

});

const ProviderAuth: React.FC = ({ children }) => {
    const [play, setPlay] = useState<boolean>(false);
    const [infoMusic, setInfoMusic] = useState<string>('');
    const [online, setOnline] = useState<string>('');
    const loadInfoMusic = () => {
        fetch('http://stmsrv.com/api-json/sNC26p79YG6vfB--xQr54BGKHN1XwnOW').then(res => {
            res.json().then(response => {
                setInfoMusic(String(response.musica_atual));
                setOnline(String(response.ouvintes_conectados));
            }).finally(() => {
                setTimeout(loadInfoMusic, 500);
            })
        })
    }
    useEffect(() => { }, [infoMusic, online]);
    useEffect(() => {
        loadInfoMusic();
    }, []);
    return (
        <ContextApp.Provider value={{
            play, setPlay,
            infoMusic, setInfoMusic,
            online, setOnline


        }}>
            {children}
        </ContextApp.Provider>
    );
}
export default ProviderAuth;


export function usePlayerStream() {
    const infoUser: ContextType = useContext(ContextApp);
    const { play, setPlay } = infoUser;
    return { play, setPlay };
}

export function useNameMusic() {
    const infoUser: ContextType = useContext(ContextApp);
    const { infoMusic, setInfoMusic } = infoUser;
    return { infoMusic, setInfoMusic };
}

export function useOnlineUsers() {
    const infoUser: ContextType = useContext(ContextApp);
    const { online, setOnline } = infoUser;
    return { online, setOnline };
}








