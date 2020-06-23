import React, { createContext, useState, useContext, useEffect } from 'react';


type ContextType = {
    play: boolean;
    setPlay: (value: boolean) => void;
    volume: number;
    setVolume: (value: number) => void;
};



const ContextApp = createContext<ContextType>({
    play: false,
    setPlay: (value: boolean) => { },
    volume: 0,
    setVolume: (value: number) => { },
});





const ProviderAuth: React.FC = ({ children }) => {
    const [play, setPlay] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0);
    return (
        <ContextApp.Provider value={{
            play, setPlay,
            volume, setVolume


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

export function useVolumePlayer() {
    const infoUser: ContextType = useContext(ContextApp);
    const { volume, setVolume } = infoUser;
    return { volume, setVolume };
}










