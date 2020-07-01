import React, { createContext, useState, useContext, useEffect } from 'react';

const Chat = createContext()
export default function ProviderChat({ children }) {

    return (
        <Chat.Provider value={{

        }}>
            {children}
        </Chat.Provider>
    )
}
