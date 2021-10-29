import React from "react";
import {Card, ListGroup, Container, Row, Col} from "react-bootstrap";
import accounts from "../json/accounts.json"
import "./DataDisplay.css"


function DataDisplay () {

    var Context = JSON.parse(localStorage.getItem("userData"));
    let cardArr = [];


    

    function cardTemplate (props) {
        return (
            <div  key={props.id}>
                <Card className="card">
                    <Card.Title className="card-title">Account #{props.id}</Card.Title>
                    <Card.Subtitle>{props.firstname} {props.lastname}</Card.Subtitle>
                    <ListGroup>
                        <ListGroup.Item>Email: {props.email}</ListGroup.Item>
                        <ListGroup.Item>Password: {props.password}</ListGroup.Item>
                        <ListGroup.Item>Balance: ${props.accountbalance}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        )
    }

    function CreateCards () {
        let toReturn = [];
        for (let i = 0; i<Context.length; i++) { 
            let toAdd = cardTemplate(Context[i]);
            toReturn.push(toAdd);
        }
        return toReturn;
    }

    function ArrangeCards () {
        return (
            <Container>
                <Row>
                    <Col><CreateCards></CreateCards></Col>
                </Row>
            </Container>
        )
    }

    return (
        <Card id="card-space">
            <ArrangeCards></ArrangeCards>
        </Card>  
    )
}

export default DataDisplay