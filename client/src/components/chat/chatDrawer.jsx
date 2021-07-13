import React from 'react';

//sub components
import ChatHead from "./chatHead/chatHead.jsx";
import ChatWall from "./chatWall/chatWall.jsx";
import SendMessageSection from "./sendMessageSection/sendMessageSection.jsx";

// for geting user email id
import { useAuth } from '../../contexts/AuthContext.js';

// Toast notifications
import MessageToast from "../notifications/messageToast";

// firebasse messages database
import { firebaseDb } from '../../firebase.js';

// css and material UI
import {Drawer, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "../../style/chatDrawer.scss"

const useStyles = makeStyles({
    paper: {
        background: '#f5f5f5',
    }
});

const ChatDrawer = (props) => {
    const styles = useStyles();
    const {chatBoxVisible, setChatBoxVisible, socketRef, myName} = props;
    const {currentUser} = useAuth();
    const messageDb = firebaseDb.child("messages").child(props.roomID);
    return(
        <div className="chat-drawer">
        <Drawer
            // className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={chatBoxVisible}
            // className="chat-drawer"
            classes={{
                paper: styles.paper,
            }}
        >
            <ChatHead setChatBoxVisible = {setChatBoxVisible} email={currentUser.email}/>
            <Divider />
            { socketRef.current ? <ChatWall email={currentUser.email} messageDb = {messageDb}/> : '' }
            { socketRef.current ? <SendMessageSection email= {currentUser.email} myName={myName} messageDb={messageDb} /> : '' }
            <MessageToast/>
        </Drawer>
        </div>
    )
}

export default ChatDrawer;
