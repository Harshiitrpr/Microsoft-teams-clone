import React, {useState} from 'react';

// container
import { Toolbar } from '@material-ui/core';

//icon imports
import CallIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ChatIcon from '@material-ui/icons/Chat';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';

//history for redirect to home page after end call
import {useHistory} from "react-router-dom"

const FootConfigurationBar = (props) => {
    const { socketRef, myVideo, userVideo, initialMicStatus, initialVideoStatus,
        chatBoxVisible, setChatBoxVisible, roomID, myName } = props;

    const [micStatus, setMicStatus] = useState(initialMicStatus);
    const [camStatus, setCamStatus] = useState(initialVideoStatus);
    const history = useHistory()

    const muteMic = () => {
        userVideo.current.srcObject.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        setMicStatus(!micStatus);
    }

    const muteCam = () => {
        userVideo.current.srcObject.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        setCamStatus(!camStatus);
    }

    //opens another tab to share screen, or close tab if share screen is on.
    // toggle hostedwebsite to localhost while running on local device.
    const shareScreen = () => {
        if(myVideo === "Camera"){
            const hostedWebsite = "https://radiant-chamber-36927.herokuapp.com/";
            // const hostedWebsite = "http://localhost:3000/";
            const url = hostedWebsite + "room/" + roomID;
            localStorage.setItem("sharescreen", true);
            localStorage.setItem("myName", myName);
            window.open(url, '_blank');
        }
        else{
            try{
                window.close();
            }
            catch{
                socketRef.current.disconnect();
                userVideo.current.srcObject.getTracks().forEach((track) =>{
                    track.stop();
                });
                history.push("/");
            }
        }
    }

    const handleChatButton = () => {
        setChatBoxVisible(!chatBoxVisible);
    }

    const handleEndCall = () => {
        socketRef.current.disconnect();
        userVideo.current.srcObject.getTracks().forEach((track) =>{
            track.stop();
        });
        history.push("/");
    }

    return(
        <section className="chat-footbar" style={{
            position:"absolute",
            bottom:"10px",
            width:"85%",
            
            // backgroundColor: "blue",
            margin:"0 auto",
            marginLeft:"10px",
            justifyContent: "center",
        }}>
            {/* <div className="footbar-title">Vi CHAT</div> */}

                <Toolbar className="footbar-wrapper" style={{
                    display:"flex",
                    justifyContent: "center",
                    width:"400px",
                    margin:"0 auto",
                }}>
                    { <div className="status-action-btn mic-btn" onClick={muteMic} title={micStatus ? 'Disable Mic' : 'Enable Mic'}
                    style={{
                        border:"solid 1px black",
                        // margin: "5px",
                        backgroundColor:"#393838",
                        padding: "5px",
                    }}
                    >
                        {micStatus ? 
                            <MicIcon style={{fill: "white",}} fontSize="large"></MicIcon>
                            :
                            <MicOffIcon style={{fill: "white",}} fontSize="large"></MicOffIcon>
                        }
                    </div>}
                    <div className="status-action-btn end-call-btn" title="End Call"
                    style={{
                        border:"solid 1px black",
                        backgroundColor:"red",
                        padding: "5px",
                    }}>
                        <CallIcon style={{fill: "white",}} onClick= {handleEndCall} fontSize="large"></CallIcon>
                    </div>
                    {<div className="status-action-btn cam-btn" onClick={muteCam} title={camStatus ? 'Disable Cam' : 'Enable Cam'}
                    style={{
                        backgroundColor:"#393838",
                        border:"solid 1px black",
                        padding: "5px",
                    }}>
                        {camStatus ? 
                            <VideocamIcon style={{fill: "white",}} fontSize="large"></VideocamIcon>
                            :
                            <VideocamOffIcon style={{fill: "white",}} fontSize="large"></VideocamOffIcon>
                        }
                    </div>}
                    <div className="screen-share-btn" style={{
                        backgroundColor:"#393838",
                        border:"solid 1px black",
                        padding: "5px",
                    }}>
                        <ScreenShareIcon style={{fill: "white",}} fontSize="large" className="screen-share-btn" onClick={shareScreen} />
                    </div>
                    <div  className="chat-btn" title="Chat" onClick={handleChatButton}style={{
                        border:"solid 1px black",
                        
                        borderRadius: "0",
                        padding: "5px",
                        backgroundColor:"#393838",
                    }}>
                        <ChatIcon style={{fill: "white",}} fontSize="large" ></ChatIcon>
                    </div>
            </Toolbar>
        </section>
    )
}

export default FootConfigurationBar;