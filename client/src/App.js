import { React, useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {

  const [userState, setUserState] = useState({
    username: '',
  })
  const [accessTokenState, setAccessTokenState] = useState('')

  useEffect(() => {
    const authHeader = "BEARER " + accessTokenState 
    console.log(authHeader);
    fetch('/myusername', {
      method: "GET",
      headers: {
        "Authorization": authHeader
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserState({
          ...userState,
          username: data
        })
      })
      .catch(err => console.log(err))

  }, [accessTokenState])

  function handleAccessToken(token) {
    setAccessTokenState(token)
  }

  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path="/login">
          <Login handleAccessToken={handleAccessToken} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/dashboard">
          <Dashboard user={userState} accessToken={accessTokenState} />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
