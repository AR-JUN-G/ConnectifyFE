import React, { useEffect, useState, useRef } from "react";
import { FiSend, FiSmile, FiPaperclip } from "react-icons/fi";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import "./ChatWindow.css";
import { Socket } from "socket.io-client";
import { directMessageListResponseType, directMessageReponseType } from "../../../Types/ChatAPI.types";
import { getDirectMessages } from "../../../API/ChatAPI";
import { APIResponseType } from "../../../Types/CommonAPIResponse.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/store";
import formatChatTime from "../../../utils/FormatDate";

const ChatWindow = ({ socket, toUserID }: { socket: Socket, toUserID: string }) => {
    const [input, setInput] = useState("");
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<Boolean>(true);
    const [messages, setMessages] = useState<directMessageReponseType[]>([]);
    const user = useSelector((state: RootState) => state.User);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const fetchMessages = async (pageNumber: number, isInitial: boolean = false) => {
        try {
            const response: APIResponseType<directMessageListResponseType> = await getDirectMessages(toUserID, pageNumber, 20);
            const newestToOldest = response.data?.messages;

            if (newestToOldest) {
                const oldestToNewest = [...newestToOldest].reverse();
                if (isInitial) {
                    setMessages(oldestToNewest);
                    scrollToBottom();
                } else {
                    setMessages(prev => [...oldestToNewest, ...prev]);
                }

                if (response.data?.pagination) {
                    setHasMore(response.data.pagination.hasMore);
                }
            }
        } catch (error) {
            console.error("Fetch Messages Error:", error);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        if (container.scrollTop === 0 && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMessages(nextPage);
        }
    };

    // Reset and fetch when current chat changes
    useEffect(() => {
        setPage(1);
        setMessages([]);
        fetchMessages(1, true);
    }, [toUserID]);

    // Auto scroll to bottom only on initial load or new message
    useEffect(() => {
        if (page === 1) {
            scrollToBottom();
        }
    }, [messages]);


    useEffect(() => {
        // 1. Turn on the listener for live messages
        socket.on("messageReceived", (newMessage: directMessageReponseType) => {
            console.log("Live message received!", newMessage);

            // 2. Safely append the new message to the END of your current list
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // 3. Pro-Move: Automatically scroll the user down to see the new text
            scrollToBottom();
        });

        // 4. THE MOST CRITICAL PART: The Cleanup Function
        // If you don't turn off the listener when the component unmounts, 
        // React will attach multiple listeners and messages will appear 2, 3, or 4 times!
        return () => {
            socket.off("messageReceived");
        };

    }, [socket]);

    const handleSend = () => {
        if (!input.trim() || !toUserID) return;

        const messageData = {
            fromUserID: user.userID,
            toUserID: toUserID,
            text: input.trim()
        };

        // Emit the message to the backend
        socket.emit("sendMessage", messageData);

        // Optimistically update the UI
        const newMessage: directMessageReponseType = {
            _id: Date.now().toString(), // Temporary ID
            senderId: user.userID || "",
            message: input.trim(),
            createdAt: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInput("");

        // Ensure we scroll to bottom after state update
        setTimeout(scrollToBottom, 0);
    };

    return (
        <div className="chat-window">
            <ChatHeader />
            <div className="messages-area" onScroll={handleScroll} ref={scrollRef}>
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <MessageBubble
                            key={msg._id}
                            text={msg.message}
                            time={formatChatTime(msg.createdAt)}
                            isSent={msg.senderId === user.userID}
                        />
                    ))
                ) : (
                    <div className="no-messages">Say hello to start the conversation!</div>
                )}
            </div>
            <footer className="chat-input-container">
                <div className="input-wrapper">
                    <button className="input-action-btn" type="button">
                        <FiPaperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="message-input"
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button className="input-action-btn" type="button">
                        <FiSmile size={20} />
                    </button>
                </div>
                <button className="send-btn" onClick={handleSend} type="button">
                    <FiSend size={20} />
                </button>
            </footer>
        </div>
    );
}

export default ChatWindow;
