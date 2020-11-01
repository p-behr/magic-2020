import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import {useUsers} from "../hooks/UserProvider";

const Title = ({mode}) => {
    switch (mode) {
        case "add":
            return (
                <Modal.Title>Add New User</Modal.Title>
            )
        case "edit":
            return (
                <Modal.Title>Edit User</Modal.Title>
            )
        case "delete":
            return (
                <Modal.Title>Delete User</Modal.Title>
            )
        default:
            return null;
    }
}

const securityOptions = [
    "",
    "ADMIN",
    "APPL",
    "PGM",
    "INTRN"
]

export default function UserForm({ show=false, mode="", currentUser={}, onCancel=f=>f }) {

    const {addUserRequest, updateUserRequest, deleteUserRequest} = useUsers();
    const [user, setUser] = useState(currentUser);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(()=>{
        setUser(currentUser);
    }, [currentUser])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({...user, [name] : value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        switch (mode){
            case "add":
                addUserRequest(user);
                break;
            case "edit":
                updateUserRequest(user);
                break;
            case "delete":
                deleteUserRequest(user);
                break;
            default:
        }
        // Call onCancel to hide the form
        onCancel();
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Title mode={mode} />
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUserId">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control
                            name="userId"
                            type="text"
                            placeholder="Enter User ID"
                            value={user.userId}
                            onChange={handleInputChange}
                            readOnly={mode!=="add"}
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            name="userName"
                            type="text"
                            placeholder="Enter User Name"
                            value={user.userName}
                            onChange={handleInputChange}
                            readOnly={mode==="delete"}
                        />
                    </Form.Group>

                    <Form.Group controlId="formSecurity">
                        <Form.Label>Security</Form.Label>
                        <Form.Control
                            name="security"
                            as="select"
                            value={user.security}
                            onChange={handleInputChange}
                            disabled={mode==="delete"}
                        >
                            {
                                securityOptions.map((option) =>(
                                    <option key={option} value={option}>{option}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {
                    errorMessage ? (
                        <Toast
                            onClose={()=>setErrorMessage('')}
                        >
                            <Toast.Header>
                                <strong className="mr-auto">Error</strong>
                            </Toast.Header>
                            <Toast.Body>{errorMessage}</Toast.Body>
                        </Toast>
                    ) : (
                        <p></p>
                    )
                }

                <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                >
                    {
                        mode === "delete" ? (
                            "Delete"
                        ) : (
                            "Save"
                        )
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
