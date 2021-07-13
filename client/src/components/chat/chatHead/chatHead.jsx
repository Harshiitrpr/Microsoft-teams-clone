import React from "react";

// material-ui component and Icon
import { IconButton } from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


// This component is head of chat drawer, Only contains button to collapse drawer.
const ChatHeader = (props) => {
    const closeDrawer = () => {
        props.setChatBoxVisible(false);
    }

    return(
        <div className="chat-head-wrapper">
            <IconButton onClick={closeDrawer} fullWidth="true">
                <ChevronRightIcon />
            </IconButton>
        </div>
    )
}

export default ChatHeader;