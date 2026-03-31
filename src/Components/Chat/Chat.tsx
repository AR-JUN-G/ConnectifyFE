import { useEffect } from "react";
import { io } from "socket.io-client";
import ChatWindow from "./ChatWindow/ChatWindow";
import ChatSideBar from "./ChatSideBar/ChatSideBar";
import "./Chat.css";
import { useParams } from "react-router";
const socket = io("http://localhost:7777");

const Chat = () => {
    const { toUserID } = useParams();

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected with Backend Successfully", socket.id);
        });

        return () => {
            socket.off("connect");
        }
    }, []);

    return (
        <div className="chat-container">
            <ChatSideBar socket={socket} />
            {toUserID ? (
                <ChatWindow socket={socket} toUserID={toUserID} />
            ) : (
                <div className="chat-placeholder">
                    <div className="placeholder-content">
                        <div className="placeholder-icon">💬</div>
                        <h2>Select a conversation</h2>
                        <p>Choose a friend from the sidebar to start chatting</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat;
