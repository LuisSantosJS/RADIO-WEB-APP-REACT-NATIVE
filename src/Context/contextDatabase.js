import React, { createContext, useState, useContext, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Chat = createContext()
export default function ProviderChat({ children }) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
    }, [messages]);

    useEffect(() => {
    loadMessages();
    }, []);

    function loadMessages() {
        firestore().collection('messages').orderBy('createTimestamp', 'desc').onSnapshot(mess => {
            setMessages([])
            mess.docs.forEach(res => {
                const a = res.data();
                setMessages(messages => [...messages, a]);
            });
        });
    }
    return (
        <Chat.Provider value={{
            messages,
            setMessages,

        }}>
            {children}
        </Chat.Provider>
    )
}
export function useMessages() {
    const infoUser = useContext(Chat);
    const { messages, setMessages } = infoUser;
    return { messages, setMessages };
}
