import React, { createContext, useState, useContext, useEffect } from 'react';


type ContextType = {
    play: boolean;
    setPlay: (value: boolean) => void;

};



const ContextApp = createContext<ContextType>({
    play: false,
    setPlay: (value: boolean) => { },

});





const ProviderAuth: React.FC = ({ children }) => {
    const [play, setPlay] = useState<boolean>(false);

    return (
        <ContextApp.Provider value={{
            play, setPlay


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







