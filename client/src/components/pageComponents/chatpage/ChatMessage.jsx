import React from "react";

// render main messages in the chat room
const ChatMessage = (props) => {
    const { sender, message, timestamp, senderEmail } = props.message;
    console.log(props);
    console.log(senderEmail, props.email, senderEmail === props.email);
    return (<>
    <div className="message-container">
        <div className={`message-wrapper ${senderEmail === props.email ? 'message-wrapper-right' : 'message-wrapper-left'}`}>
            <div className="message-title-wrapper">
                <h5 className="message-name">{sender}</h5>
                <span className="message-timestamp">{timestamp}</span>
            </div>
            <p className="actual-message">{message}</p>
        </div>
    </div>
    </>)
}

export default ChatMessage;