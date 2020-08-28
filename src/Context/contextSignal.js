import React, { createContext, useState, useContext, useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import io from "socket.io-client";
//b3bec0a9-8ecf-4fdd-82f7-ae967a1eefd0
const Signal = createContext()
export default function ProviderSignal({ children }) {
    const socket = io("http://radiocampusapi.com.br");


    function onReceived(notification) {
        console.log("Notification received: ", notification);
    }
    useEffect(() => {
        NetInfo.fetch().then(state => {
            // console.log('Connection type', state.type);
            // console.log('Is connected?', state.isConnected);
            const IPA = state.details.ipAddress;
            // console.log('details', IPA)
            socket.emit('login', { IP: IPA });
        });
    }, []);
    useEffect(()=>{
        OneSignal.init("b3bec0a9-8ecf-4fdd-82f7-ae967a1eefd0");
        OneSignal.enableSound(true);
        OneSignal.enableVibrate(true);
        OneSignal.addEventListener('received', onReceived);
    },[])


    return (
        <Signal.Provider value={{

        }}>
            {children}
        </Signal.Provider>
    )
}
