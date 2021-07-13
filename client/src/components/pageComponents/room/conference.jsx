import React, {useRef, useEffect, useState} from 'react';

//css and tooltip , UI components
import "../../../style/conference.scss"
import Tooltip from '@material-ui/core/Tooltip';


//video tag with user stream
const Video = (props) => {
    const ref = useRef();
    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);
    return (<Tooltip disableFocusListener title={props.name} arrow>
            <video playsInline autoPlay ref={ref}/>
        </Tooltip>
    );
}

const VideoGrid = (props) => {
    const {userVideo, peers, myName} = props;
    const [pin, setPin] = useState(false);
    const [keyPinned, setKeyPinned] = useState('');

    const handlePin = (id) => {
        console.log("handlePin", id);
        setPin(!pin);
        setKeyPinned(id);
    }

    return(
        <div className="room-container">
            <div>
                <Tooltip disableFocusListener title={myName} arrow>
                    <video className="my-stream" muted ref={userVideo} autoPlay playsInline />
                </Tooltip>
            </div>

            {peers.map((peer) => {
                return pin && keyPinned !== peer.peerID ? '': (
                    <section key={peer.peerID} style={{}} onClick={()=> handlePin(peer.peerID)}>
                            <Video className="other-stream" peer={peer.peer} name = {peer.name}/>
                    </section>
                )
            })}
        </div>
    )
}

export default VideoGrid;