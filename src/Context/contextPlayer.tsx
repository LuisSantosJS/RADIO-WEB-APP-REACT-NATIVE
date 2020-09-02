import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as Updates from 'expo-updates'
import io from "socket.io-client";
import api from '../services/api';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
type ContextType = {
    play: boolean;
    setPlay: (value: boolean) => void;
    infoMusic: string;
    setInfoMusic: (value: string) => void;
    online: string;
    setOnline: (value: string) => void;
    userId: number;
    setUserId: (value: number) => void;
    userSaved: boolean;
    setUserSaved: (value: boolean) => void;
    select: string;
    setSelect: (value: string) => void;
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    controlSave: boolean;
    setControlSave: (value: boolean) => void;
    numberLikes: number;
    setNumberLikes: (value: number) => void;
    namePlayPause: string;
    setNamePlayPause: (value: string) => void;
    capaMusica: string;
    setCapaMusica: (value: string) => void;

};

const ContextApp = createContext<ContextType>({
    play: false,
    setPlay: (value: boolean) => { },
    infoMusic: '',
    setInfoMusic: (value: string) => { },
    online: '',
    setOnline: (value: string) => { },
    userId: 0,
    setUserId: (value: number) => { },
    userSaved: false,
    setUserSaved: (value: boolean) => { },
    select: 'SELECIONE SEU CURSO',
    setSelect: (value: string) => { },
    email: '',
    setEmail: (value: string) => { },
    name: '',
    setName: (value: string) => { },
    controlSave: false,
    setControlSave: (value: boolean) => { },
    numberLikes: 0,
    setNumberLikes: (value: number) => { },
    namePlayPause: 'play',
    setNamePlayPause: (value: string) => { },
    capaMusica: 'play',
    setCapaMusica: (value: string) => { },
});


const ProviderAuth: React.FC = ({ children }) => {
    const [play, setPlay] = useState<boolean>(false);
    const [infoMusic, setInfoMusic] = useState<string>('RÁDIO CAMPUS IFAC - SEJA BEM VINDO');
    const [online, setOnline] = useState<string>('');
    const socket = io("http://radiocampusapi.com.br");
    const [capaMusica, setCapaMusica] = useState<string>('nulo');
    const [controlSave, setControlSave] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);
    const [namePlayPause, setNamePlayPause] = useState<string>('play');
    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [select, setSelect] = useState<string>('SELECIONE SEU CURSO');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [numberLikes, setNumberLikes] = useState<number>(0);


    useEffect(() => {


   
            socket.on('online', (res: any)=>{
                setOnline(res)
                //console.log(res)
            })
    




    }, [])

    useEffect(() => {
        async function updateApp() {
            const {isAvailable} = await Updates.checkForUpdateAsync();

            if(isAvailable){
                Toast.showWithGravity('Aplicando Correções...', Toast.LONG, Toast.TOP)
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }

        }
        updateApp();
    }, [])

    useEffect(() => { }, [infoMusic, online, numberLikes, capaMusica]);

    useEffect(() => {
        async function loadMusic() {
            const response = await fetch('http://xcast.com.br/api-json/VkZaU1JrNVZOVFphZWpBOStS')
            const res = await response.json();
            setInfoMusic(JSON.parse(JSON.stringify(res.musica_atual)));
            setCapaMusica(String(res.capa_musica));
            //console.log('online', res.ouvintes_conectados);
            api.get('/users/likes').then(likes => {
                setNumberLikes(likes.data.likes);
            })

            return setTimeout(loadMusic, 1000)
        }
        loadMusic();

    }, []);

    useEffect(() => {
        async function getData() {
            try {
                const jsonValue = await AsyncStorage.getItem('@user')
                if (jsonValue !== null) {
                    console.log(JSON.parse(jsonValue));
                    setUserId(JSON.parse(jsonValue).userID);
                    setEmail(JSON.parse(jsonValue).email);
                    setSelect(JSON.parse(jsonValue).course);
                    setName(JSON.parse(jsonValue).name);
                    setUserSaved(JSON.parse(jsonValue).userSaved);
                }
            } catch (e) {
                // error reading value
                console.log('error load user')
            }
        }
        getData();

    }, [])


    return (
        <ContextApp.Provider value={{
            play, setPlay,
            infoMusic, setInfoMusic,
            online, setOnline,
            userId, setUserId,
            userSaved, setUserSaved,
            select, setSelect,
            name, setName,
            email, setEmail,
            controlSave, setControlSave,
            numberLikes, setNumberLikes,
            namePlayPause, setNamePlayPause,
            capaMusica, setCapaMusica
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

export function useUserID() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userId, setUserId } = infoUser;
    return { userId, setUserId };
}

export function useSavedUser() {
    const infoUser: ContextType = useContext(ContextApp);
    const { userSaved, setUserSaved } = infoUser;
    return { userSaved, setUserSaved };
}

export function useNameUser() {
    const infoUser: ContextType = useContext(ContextApp);
    const { name, setName } = infoUser;
    return { name, setName };
}

export function useEmail() {
    const infoUser: ContextType = useContext(ContextApp);
    const { email, setEmail } = infoUser;
    return { email, setEmail };
}
export function useCourse() {
    const infoUser: ContextType = useContext(ContextApp);
    const { select, setSelect } = infoUser;
    return { select, setSelect };
}
export function useControlSave() {
    const infoUser: ContextType = useContext(ContextApp);
    const { controlSave, setControlSave } = infoUser;
    return { controlSave, setControlSave };
}

export function useLikes() {
    const infoUser: ContextType = useContext(ContextApp);
    const { numberLikes, setNumberLikes } = infoUser;
    return { numberLikes, setNumberLikes };
}
export function usePlayPause() {
    const infoUser: ContextType = useContext(ContextApp);
    const { namePlayPause, setNamePlayPause } = infoUser;
    return { namePlayPause, setNamePlayPause };
}

export function useCapaMusica() {
    const infoUser: ContextType = useContext(ContextApp);
    const { capaMusica, setCapaMusica } = infoUser;
    return { capaMusica, setCapaMusica };
}











