import React, { useState, useRef } from "react"
import { Form, Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
//for unique ids
import { v1 as uuid } from "uuid";

// copy module
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Dashboard = () => {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const conferenceRef = useRef();
    const chatRef = useRef();
    const nameRef = useRef();

    // const create = () => {
    //     const id = uuid();
    //     history.push(`/room/${id}`);
    // }

    const handleLogout = async() => {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    const joinConference = () => {
        history.push(`/room/${conferenceRef.current.value}`);
    }

    const joinChat = () =>{
        const data = {
            myName: nameRef.current.value
        }
        history.push({
            pathname: `/chat/${chatRef.current.value}`,
            state: data,
        });
    }

    return (<div>
        <Container
        className="d-flex align-items-center justify-content-around"
        style={{ minHeight: "70vh" }}
        >
        <div className="d-flex justify-content-around" >
            <Card className="align-items-center" style={{ minWidth: "35vh"}}>
                <Card.Body className="d-flex flex-column">
                    <h2 className="text-center mb-5">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="text-center">
                        <strong>Email:</strong> {currentUser.email}
                    </div>
                    <CopyToClipboard text={uuid()} >
                        <Button className="mt-auto w-100" fullWidth>Create roomID</Button>
                    </CopyToClipboard>
                </Card.Body>
            </Card>
        <Card>
            <Card.Body>
                <h2 className="text-center" className="mb-5">Join Room</h2>
                <Form onSubmit={joinConference} className="d-flex flex-column mb-auto">
                    <Form.Group id="RoomIdForConference" className="mb-5">
                    <Form.Label>Enter Link</Form.Label>
                    <Form.Control className="mb-2" type="text" ref={conferenceRef} required />
                    </Form.Group>
                    <Button className="w-100 mt-3" type="submit">
                    Join Conference
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Join Chat</h2>
            <Form onSubmit={joinChat}>
                <Form.Group id="RoomIdForChat">
                <Form.Label>Enter Link</Form.Label>
                <Form.Control type="text" ref={chatRef} required />
                <Form.Label>Enter Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />       
                </Form.Group>
                <Button className="w-100 mt-2" type="submit"> Join Chat </Button>
            </Form>
            </Card.Body>
        </Card>
        </div>
        </Container>
        <div className=" text-center mb-sm-5">
            <Button variant="outline-secondary"  onClick={handleLogout}>
                Log Out
            </Button>
        </div>
    </div>
    )
}

export default Dashboard;