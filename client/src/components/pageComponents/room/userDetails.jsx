import React, {useRef} from "react";
// bootstrap container
import { Form, Card, Button, Container } from "react-bootstrap"

// pre joining menu
const UserDetailsBeforeJoining = (props) => {
    const  {setMyName, myVideo, setMyVideo, setSubmited,
            videoToggle, setVideoToggle, micToggle, setMicToggle} = props;

    const nameRef = useRef();

    const joinConference = () => {
        setMyName(nameRef.current.value);
        setSubmited(true);
    }
    
    // name camera/screen micstatus videostatus
    return(<Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
    >
    <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Join Room</h2>
            <Form onSubmit={joinConference}>
                <Form.Group>
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" ref={nameRef} required />
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Control as="select" onChange={(e) => setMyVideo(e.target.value)}>
                        <option value="Camera">Use Camera</option>
                        <option value="Screen">Share Screen</option>
                    </Form.Control>
                </Form.Group>
                <Form.Check custom type="switch">
                    <Form.Check.Input checked={videoToggle} onClick={() => setVideoToggle(!videoToggle)}/>
                    <Form.Check.Label onClick={() => setVideoToggle(!videoToggle)}>
                        {videoToggle? `${myVideo} On`: `${myVideo} Off`}
                    </Form.Check.Label>
                </Form.Check>
                <Form.Check custom type="switch">
                    <Form.Check.Input checked={micToggle} />
                    <Form.Check.Label onClick={() => setMicToggle(!micToggle)}>
                        {micToggle? "Mic On": "Mic Off"}
                    </Form.Check.Label>
                </Form.Check>
                <Button className="w-100 mt-4" type="submit">
                    Join Conference
                </Button>
            </Form>
        </Card.Body>
    </Card>
    </div>
    </Container>)
}

export default UserDetailsBeforeJoining;