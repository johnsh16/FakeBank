import React from "react";
import {Form, Button, Card} from "react-bootstrap"
import "./Login.css"


function Login () {

    var userList = JSON.parse(localStorage.getItem("userData"));
    const [validatePass, setValidatePass] = React.useState(false);
    const [validateEmail, setValidateEmail] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    var index = null;

    function validateCredentials(pass, email) {
        for (let i = 0; i<userList.length; i++) {
            if (userList[i]["email"] == email) {
                setValidateEmail(true);
                if (userList[i]["password"] == pass) {
                    setValidatePass(true);
                    index = i;
                    return true;
                }
            }
        }
        setValidateEmail(false);
        setValidatePass(false);
    }

    function handleSubmit () {
        setSubmit(true);
        if (validateCredentials(document.getElementById("password").value, document.getElementById("email").value)) {
            localStorage.setItem("currentUser", JSON.stringify(userList[index]));
            document.getElementById("login-container").hidden = true;
            document.getElementById("login-success").hidden = false;
        } else {
            console.log("not validated")
        }
    }

    return (
        <React.Fragment>
            <Card id="login-container" hidden={false}>
                <Card.Title>Login</Card.Title>
                <Form id="login-form" onChange={validateCredentials}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"></Form.Control>
                    </Form.Group>
                    <Button className="login-button" onClick={handleSubmit}>Submit</Button>
                    <Button className="login-button" href="/home">Cancel</Button>
                </Form>
                <Card.Text>
                    Hint: use "fake@test.com" and "password"
                </Card.Text>
            </Card>
            <Card id="login-success" hidden={true}>
                <Card.Title className="card-title">
                    Logged in!
                </Card.Title>
                <Button href="/home">Return Home</Button>
            </Card>
        </React.Fragment>
    )
}

export default Login