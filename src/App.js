import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import './App.css';

import NavBar from './components/NavBar';
import Loading from './components/Loading'
import Auth from './components/user-authentication/Auth';
import Feed from "./components/posts/Feed";
//import Chat from "./components/chat/Chat";
import User from "./components/profile/User";

function App () {
  const [ userLogged, setUserLogged ] = useState(null);

  function logIn(user) {
    setUserLogged(user);
  }

  function logOut() {
    axios.get('http://localhost:5000/logout', { withCredentials: true })
      .then(res => {
        setUserLogged(null);
        console.log(res.data);
        window.location = '/auth';
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    axios.get('http://localhost:5000/', {withCredentials: true})
      .then(res => {
        let user = res.data;
        console.log(user);
        if (user) {
          setUserLogged(user);
        } else {
          setUserLogged(false);
        }
        // Acá hay un problema: el Efecto logea al usuario de res.data en cualquier caso posible.
        // Efecto a veces buscado, cuando el valor de 'userLogged' es null, pero no cuando es otro usuario logeado.
      })
      .catch(e => console.log(e));
  }, []);
  
  if (userLogged === null) {
    return(
      <Loading/>
    )
  } else {
    return (
      <Router>
        <NavBar user={userLogged} onLogOut={logOut}/>
        <Switch>
          <Route path='/' exact>
            {userLogged === false &&
            <Redirect to='/auth' />}
            {userLogged.username && 
            <Redirect to='/feed' />}
          </Route>
          <Route path='/feed' component={Feed}/>
          <Route path='/auth'>
            <Auth onLogIn={logIn} user={userLogged}/>
          </Route>
          <Route path='/user' component={User}/>
          <Route render={() => <Redirect to='/'/>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
