import React from "react";
import {Form, Button, Card, Col, InputGroup, Box, Alert} from "react-bootstrap";
import * as fs from 'fs';
import * as yup from 'yup';
import {useFormik} from "formik";
import accounts from "../json/accounts.json"
import "./CreateAccount.css"

function CreateAccount () {

    // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    let userList = JSON.parse(localStorage.getItem("userData"));

    const [validated, setValidated] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    const [emailCheck, setEmailCheck] = React.useState(false);
    const [validatePassword, setValidatePassword] = React.useState(false);
    const [validateFirst, setValidateFirst] = React.useState(false);
    const [validateLast, setValidateLast] = React.useState(false);

    var submitTemplate = {
        "id" : "",
        "firstname" : "",
        "lastname" : "",
        "email" : "",
        "password" : "",
        "accountbalance" : 0
    }

    function createNewUser () {
        submitTemplate["id"] = userList.length+1;
        submitTemplate["firstname"] = document.getElementById("validationCustomFirstname").value;
        submitTemplate["lastname"] = document.getElementById("validationCustomLastname").value;
        submitTemplate["email"] = document.getElementById("validationCustomEmail").value;
        submitTemplate["password"] = document.getElementById("validationCustomPassword").value;
        userList.push(submitTemplate);
        localStorage.setItem("userData", JSON.stringify(userList));
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;

        setSubmit(true);

        if (passwordCheckFunction() && emailCheckFunction() && checkFirst() && checkLast()) {
            createNewUser();
            clearForm();
            setValidated(true);
            document.getElementById("form").hidden = true;
            document.getElementById("success-container").hidden = false;
            
        } 
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setTimeout(() => {
            setSubmit(false);
            setValidated(false);
        }, 3000)
        
        
        
    };

    const passwordCheckFunction = (event) => {
        if (document.getElementById("validationCustomPassword").value.length < 8) {
            setValidatePassword(false);
            return false;
        } else {
            setValidatePassword(true);
            return true;
        }
    }

    function checkFirst () {
        let toCheck = document.getElementById("validationCustomFirstname").value;
        if (toCheck != "") {
            setValidateFirst(true);
            return true;
        } else {
            setValidateFirst(false);
            return false;
        }
    }

    function checkLast () {
        let toCheck = document.getElementById("validationCustomLastname").value;
        if (toCheck != "") {
            setValidateLast(true);
            return true;
        } else {
            setValidateLast(false);
            return false;
        }
    }

    const emailCheckFunction = (event) => {
        if (document.getElementById("validationCustomEmail").value.includes("@")) {
            setEmailCheck(true);
            console.log("Seeing an @")
            return true;
        } else {
            setEmailCheck(false);
            console.log("Not seeing an @")
            return false;
        };
    }  
    
    function checkValidation () {
        emailCheckFunction()
        passwordCheckFunction()
        checkFirst()
        checkLast()
        if (emailCheck && validatePassword && validateFirst && validateLast) {
            setValidated(true);
        } else {
            setValidated(false);
        }
    }

    function reloadForm () {
        document.getElementById("form").hidden = false;
        document.getElementById("success-container").hidden = true;
    }

    function clearForm () {
        document.getElementById("validationCustomFirstname").value = "";
        document.getElementById("validationCustomLastname").value = "";
        document.getElementById("validationCustomEmail").value = "";
        document.getElementById("validationCustomPassword").value = "";
    }

    return (
        <React.Fragment >
        
        {(validated && submit) ? <Alert variant="success">Success! Your account was created.</Alert> : null}
        {(submit && !validatePassword) ? <Alert variant="danger">Password must be 8 characters.</Alert> : null}
        {(submit && !emailCheck) ? <Alert variant="danger">Please enter a valid email.</Alert> : null}
        {(submit && !validateFirst) ? <Alert variant="danger">Please enter a valid first name.</Alert> : null}
        {(submit && !validateLast) ? <Alert variant="danger">Please enter a valid last name.</Alert> : null}
        <div id="form" hidden={false}>
            <Card className="form-card" bg="light" visible="true">
                <Card.Header></Card.Header>
                <Card.Title className="card-title">Create Account</Card.Title>
                <Form id="createAccountForm" onChange={checkValidation} onSubmit={handleSubmit} >
                    <Form.Group  controlId="validationCustomFirstname" validated={validated} >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            type="firstname"
                            placeholder="Enter first name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group  controlId="validationCustomLastname" validated={validated} onSubmit={handleSubmit}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            type="lastname"
                            placeholder="Enter last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group  controlId="validationCustomEmail" validated={validated && emailCheckFunction} onChange={emailCheckFunction}>
                    <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                aria-describedby="inputGroupPrepend"
                                required
                                validated={emailCheckFunction}
                            />
                            <Form.Control.Feedback type="invalid">
                            Please enter a valid email.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group  controlId="validationCustomPassword" validated={validated && passwordCheckFunction}>
                    <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation onChange={passwordCheckFunction} >
                            <Form.Control
                                type="text"
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                            Password must be at least 8 characters. 
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    
                    <Button variant="primary" className="account-button" type="submit">
                        Submit
                    </Button>
                    <Button variant="primary" type="clear" onClick={clearForm} className="account-button" >
                        Clear Form
                    </Button>
                </Form>
                <Card.Footer></Card.Footer>
            </Card>
        </div>
        <div id="success-container" hidden={true}>
            <Card>
                <Card.Title>Create Another Account?</Card.Title>
                <Button onClick={reloadForm}>Create Another Account</Button>
            </Card>
        </div>
        </React.Fragment>
        
        )
}

export default CreateAccount