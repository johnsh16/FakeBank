import React, { Fragment } from "react";
import {Card, InputGroup, FormControl, Button, Alert} from "react-bootstrap";
import data from "../json/accounts.json"

function Withdraw () {

    let context = JSON.parse(localStorage.getItem("currentUser"));

    const userInfo = data;
    const [validate, setValidate] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);

    function checkWithdrawal (event) {
        let currentBalance = userInfo.accounts[0]["accountbalance"];
        console.log(currentBalance)
        let testValue = document.getElementById("withdrawal-field").value;
        if (testValue <= 0 || testValue > currentBalance) {
            setValidate(false);
            return false;
        }
        else {
            setValidate(true);
            return true;
        }
        
    }

    function logWithdrawal(user, amount) {
        let currentTrans = JSON.parse(localStorage.getItem("transactions"));
        let toAdd = {
            "type" : "withdrawal",
            "user" : user["id"],
            "amount" : amount
        }
        currentTrans.push(toAdd);
        localStorage.setItem("transactions", JSON.stringify(currentTrans));
    }

    function handleSubmit () {
        if (validate) {
            setSubmit(true);
        }
        context["accountbalance"] -= Number(document.getElementById("withdrawal-field").value);
        //logWithdrawal(context, Number(document.getElementById("withdrawal-field").value))
        localStorage.setItem("currentUser", JSON.stringify(context));
        document.getElementById("withdrawal-field").value = "";
        setValidate(false);
    }

    return (
        <React.Fragment>
            {submit ? <Alert variant="success">Success! Your transaction was processed.</Alert> : null}
            <Card className="module">
                <Card.Header></Card.Header>
                <Card.Title className="card-title">Make a Withdrawal</Card.Title>
                <Card.Body>
                <Card className="account-info">
                    <Card.Title>Your Account</Card.Title>
                    <Card.Text>Name: {context["firstname"]}</Card.Text>
                    <Card.Text>Account #: {context["id"]}</Card.Text>
                    <Card.Text>Balance: {context["accountbalance"]}</Card.Text>
                </Card>
                <InputGroup className="mb-3" onChange={checkWithdrawal} >
                    <InputGroup.Text>$</InputGroup.Text>
                        <FormControl aria-label="Amount (to the nearest dollar)" type="number" id="withdrawal-field"/>
                        <InputGroup.Text>.00</InputGroup.Text>
                        <Button disabled={!validate} onClick={handleSubmit}>Make Withdrawal</Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default Withdraw