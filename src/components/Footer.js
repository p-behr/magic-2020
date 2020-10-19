import React, {useState} from 'react';
import { FaCog } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col";


export default function Footer({currentUrl={}, onSubmit=f=>f}) {

    const [showSettings, setShowSettings] = useState(false);
    const [url, setUrl] = useState(currentUrl);

    const  handleCogPress = () => {
        setShowSettings(!showSettings);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit( url );
        handleCogPress();  // hide the form
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUrl({...url, [name] : value});
    }

    const handleAlertChange = (e) => {
        setUrl({...url, alert : e.target.checked});
    }

    return (
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <Button variant="outline-dark" onClick={handleCogPress}>< FaCog /></Button>

        {
        showSettings ? (
            <>

                <Form onSubmit={handleFormSubmit}>
                    <Form.Group as={Row} controlId="get">
                        <Form.Label column sm="1">GET</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                    type="text"
                                    name="get"
                                    onChange={handleInputChange}
                                    placeholder="Add a URL for GET requests"
                                    defaultValue={url.get}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="post">
                        <Form.Label column sm="1">POST</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                    type="text"
                                    name="post"
                                    onChange={handleInputChange}
                                    placeholder="Add a URL for PUT/POST/DELETE requests"
                                    defaultValue={url.post}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="alert">
                        <Form.Label column sm="1">Alerts</Form.Label>
                        <Col sm="10">
                        <Form.Check
                            type="checkbox"
                            name="alert"
                            onChange={handleAlertChange}
                            checked={url.alert}
                        />
                        </Col>
                    </Form.Group>
                    <Button type="submit">Update</Button>
                </Form>

            </>
        ) : (
            <br />
        )
        }

    </footer>
    )

}
