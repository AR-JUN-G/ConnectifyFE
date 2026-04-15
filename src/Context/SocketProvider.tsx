import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { SOCKET_URL } from '../utils/constants';

interface SocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({ 
    socket: null, 
    onlineUsers: [] 
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const user = useSelector((state: RootState) => state.User);

    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        if (!user?.userID) return;

        const newSocket = io(SOCKET_URL, {
            query: { userID: user.userID }
        });

        newSocket.on("connect", () => {
            console.log("Global Socket Connected:", newSocket.id);
        });

        newSocket.on("getOnlineUser", (users: string[]) => {
            setOnlineUsers(users);
        });

        setSocket(newSocket);

        return () => {
            console.log("Disconnecting Global Socket...");
            newSocket.off("getOnlineUser");
            newSocket.disconnect();
        };

    }, [user.userID]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};