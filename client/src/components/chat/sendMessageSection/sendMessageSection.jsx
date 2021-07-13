import React, {useState} from "react";

// Icons and containers from materialUI
import {IconButton, Input} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

// utils function
import {getMessageDateOrTime} from "../../../utils/helperFunctions";


// Component to send message text field and send button, bottom section of drawer
const SendMessageSection = (props) => {
    const [message, setMessage] = useState("");

    const sendMessage = (e)=> {
        e.preventDefault();
        if(message !== ""){
            const messageDetail = {
                message: message,
                sender: props.myName, 
                timestamp: getMessageDateOrTime(new Date()), 
                senderEmail: props.email
            };  

            // storing message details in realtime database
            props.messageDb.push(messageDetail);
            setMessage("");
        }
        return false;
    }

    return(
        <div className="chat-drawer-input">
            <form className="send-section" noValidate autoComplete="off" onSubmit={sendMessage}>
                <Input placeholder="  Type Here" fullWidth inputProps={{ 'aria-label': 'description' }} value= {message} onChange={(e) => {setMessage(e.target.value) }}/>
                <IconButton type = "submit" onSubmit={() => sendMessage}><SendIcon fontSize="large" /></IconButton>
            </form>
        </div>
    )
}

export default SendMessageSection;