import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

interface MessageBubbleProps {
    id: string;
    text: string;
    time: string;
    isSent: boolean;
    onUnsend?: (id: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ id, text, time, isSent, onUnsend }) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleUnsendClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowOptions(false);
        if (onUnsend) onUnsend(id);
    };

    return (
        <div 
            className={`message-bubble-row ${isSent ? "sent" : "received"}`}
            onMouseLeave={() => setShowOptions(false)}
        >
            <div className="message-bubble-wrapper">
                {isSent && onUnsend && (
                    <div className="message-options-container">
                        <button 
                            className="message-options-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowOptions(!showOptions);
                            }}
                        >
                            <FiMoreVertical size={16} />
                        </button>
                        {showOptions && (
                            <div className="message-dropdown-menu">
                                <button onClick={handleUnsendClick}>Unsend</button>
                            </div>
                        )}
                    </div>
                )}
                <div className="message-bubble">
                    <p style={{ margin: 0 }}>{text}</p>
                    <div className="message-time">{time}</div>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
