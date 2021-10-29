import React from "react";
import { useParams } from "react-router-dom"
import {Card, InputGroup, FormControl, Button, Alert} from "react-bootstrap";
import data from "../json/accounts.json"
import "./Deposit.css"
import AccountInfo from "../App.js"

function Deposit () {

    const { dataIn } = useParams();

    var testing = JSON.parse(localStorage.getItem("currentUser"));
    console.log(testing["id"])
    var Context = JSON.parse(localStorage.getItem("currentUser"));
    
    const [validate, setValidate] = React.useState(false);
    const [notANumber, setNotANumber] = React.useState(false)
    const [negNumber, setNegNumber] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);

    

    function checkDeposit (event) {
        setSubmit(false);
        let testValue = document.getElementById("deposit-field").value;
        if (testValue < 0) {
            setValidate(true);
            setNotANumber(false);
            setNegNumber(true);
            return false;
        } else if ((typeof Number(testValue)) != "number") {
            setNegNumber(false);
            setValidate(true);
            setNotANumber(true);
            return false;
        }
        else {
            setValidate(true);
            return true;
        }
    }

    function logDeposit(user, amount) {
        let currentTrans = JSON.parse(localStorage.getItem("transactions"));
        let toAdd = {
            "type" : "deposit",
            "user" : user["id"],
            "amount" : amount
        }
        currentTrans.push(toAdd);
        localStorage.setItem("transactions", JSON.stringify(currentTrans));
    }

    function AccountCard () {
        return (
            <React.Fragment>
            <Card className="account-info">
                <Card.Title>Your Account</Card.Title>
                    <Card.Text>Name: {Context["firstname"]}</Card.Text>
                    <Card.Text>Account #: {Context["id"]}</Card.Text>
                    <Card.Text>Balance: {Context["accountbalance"]}</Card.Text>
            </Card>
            </React.Fragment>
        )
    }

    function handleSubmit () {
        if (validate) {
            setSubmit(true);
        }
        if (validate && !negNumber && !notANumber) {
            Context["accountbalance"] += Number(document.getElementById("deposit-field").value);
            //logDeposit(Context, Number(document.getElementById("deposit-field").value))
            localStorage.setItem("currentUser", JSON.stringify(Context));
            document.getElementById("deposit-field").value = "";
        }
        
        setValidate(false);
    }

    return (
        <React.Fragment>
            {(!notANumber && !negNumber && submit) ? <Alert variant="success">Success! Your transaction was processed.</Alert> : null}
            {(notANumber && submit) ? <Alert variant="danger">Please enter a number to make a transaction.</Alert>: null}
            {(negNumber && submit) ? <Alert variant="danger">Cannot make a negative deposit. Visit "Withdraw" page if you wish to make a withdrawal.</Alert>: null}

            <Card className="module">
                <Card.Header></Card.Header>
                <Card.Title className="card-title">Make a Deposit</Card.Title>
                <Card.Body>
                <AccountCard></AccountCard>
                <InputGroup className="mb-3" onChange={checkDeposit} >
                    <InputGroup.Text>$</InputGroup.Text>
                        <FormControl aria-label="Amount (to the nearest dollar)" type="number" id="deposit-field"/>
                        <InputGroup.Text>.00</InputGroup.Text>
                        <Button disabled={!validate} onClick={handleSubmit}>Make Deposit</Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default Deposit