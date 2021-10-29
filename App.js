import React from "react";
import logo from './logo.svg';
import './App.css';
import DataDisplay from "./pages/DataDisplay";
import CreateAccount from "./pages/CreateAccount"
import {Navbar, Container, Nav, Button } from "react-bootstrap"
import Home from "./pages/Home"
import Deposit from "./pages/Deposit"
import Withdraw from "./pages/Withdraw"
import Box from "@mui/material/Box"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import data from "./json/accounts.json"
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import {LinkContainer} from "react-router-bootstrap"
import context from "react-bootstrap/esm/AccordionContext";
import { setNestedObjectValues } from "formik";


function App({props}) {

  let testData = JSON.stringify(data.accounts);
  let testCurrent = JSON.stringify(data.accounts[0]);
  var getUser = JSON.parse(localStorage.getItem("userData"));
  var getCurrent = JSON.parse(localStorage.getItem("currentUser"));


  function checkLocalStorage() {
    if (getUser == undefined) {
      localStorage.setItem("userData", JSON.stringify(data.accounts));
    }
    if (getCurrent == undefined) {
      localStorage.setItem("currentUser", JSON.stringify(data.accounts[0]));
    }
  }
  checkLocalStorage();

  

  function checkChanges() {
    let index = getCurrent["id"]-1;
    if (getUser[index]["accountbalance"] != getCurrent["accountbalance"]) {
      let newUserList = [];
      for (let i = 0; i<index; i++) {
        newUserList.push(getUser[i]);
      }
      newUserList.push(getCurrent);
      for (let i = index+1; i<getUser.length; i++) {
        newUserList.push(getUser[i]);
      }
      localStorage.setItem("userData", JSON.stringify(newUserList))
    }
  }
  checkChanges();
  

  function NavBar () {

    const [value, setValue] = React.useState(0);

    return ( 
        <React.Fragment>
          <Box>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              >
                <BottomNavigationAction label="Home" href="/home"></BottomNavigationAction>
                <BottomNavigationAction label="Deposit" href="/deposit"></BottomNavigationAction>
                <BottomNavigationAction label="Withdraw" href="/withdraw" ></BottomNavigationAction>
                <BottomNavigationAction label="Create Account" href="/createaccount" ></BottomNavigationAction>
                <BottomNavigationAction label="Data" href="/datadisplay" ></BottomNavigationAction>
              </BottomNavigation>
          </Box>
        </React.Fragment>
    )
  }

  function Header () {
    return (
      <NavBar></NavBar>
    )
  }


  return ( 
    <div id="app">
      <NavBar></NavBar>
    <main> 
      <BrowserRouter>
          <Switch>
              <Route path='/home' component={Home} />
              <Route path='/withdraw' component={Withdraw}/>
              <Route path='/deposit' component={Deposit}/>
              <Route path="/createaccount" component={CreateAccount} />
              <Route path="/datadisplay" component={DataDisplay} />
          </Switch>
      </BrowserRouter>
    </main>
    </div>
  );
}

export default App;
