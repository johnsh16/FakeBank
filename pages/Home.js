import {Card, Button} from "react-bootstrap"
import bankimg from "../images/bank.png"
import "./Home.css"
import Login from "./Login"

function Home () {


    var Context = JSON.parse(localStorage.getItem("currentUser"));

    function loadLogin () {
        document.getElementById("home-card").hidden = true;
        document.getElementById("login-card").hidden = false;
    }

    return (
        <div>
            <Card id="home-card" hidden={false}>
                <Card.Title className="card-title">
                    Welcome to FakeBank!
                </Card.Title>
                <Card.Subtitle>
                    You are logged in as {Context.firstname} {Context.lastname}
                </Card.Subtitle>
                <Card.Img variant="top" id="card-image" src={bankimg} />
                <Button onClick={loadLogin} id="sign-out">Sign Out</Button>
            </Card>
            <div id="login-card" hidden={true}>
                <Login></Login>
            </div>    
        </div>
    )
}

export default Home