import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';


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
    select: 'REDES DE COMPUTADORES',
    setSelect: (value: string) => { },
    email: '',
    setEmail: (value: string) => { },
    name: '',
    setName: (value: string) => { },
    controlSave: false,
    setControlSave: (value: boolean) => { },
});


const ProviderAuth: React.FC = ({ children }) => {
    const [play, setPlay] = useState<boolean>(false);
    const [infoMusic, setInfoMusic] = useState<string>('');
    const [online, setOnline] = useState<string>('');
    const [controlSave, setControlSave] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);
    const [userSaved, setUserSaved] = useState<boolean>(false);
    const [select, setSelect] = useState<string>('REDES DE COMPUTADORES');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
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

    useEffect(() => {
        async function getData() {
            try {
                const jsonValue = await AsyncStorage.getItem('@user')
                if (jsonValue !== null) {
                    console.log(JSON.parse(jsonValue));
                    setUserId(JSON.parse(jsonValue).userId);
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
            controlSave, setControlSave
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









