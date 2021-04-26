import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import './App.css';

import NavBar from './components/NavBar';
import Auth from './components/user-authentication/Auth';
import Feed from "./components/posts/Feed";
import Chat from "./components/chat/Chat";
import Notifications from "./components/notifications/Notifications";
import User from "./components/profile/User";

class App extends React.Component {
  constructor(props){
    super(props);

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      userLogged: null
    }
  }

  componentDidMount() {
    //Check if there is a session
    axios.get('http://localhost:5000/', { withCredentials: true })
      .then(res => {
        if (res.data.username) {
          this.logIn(res.data);
        } else if (res.data.redirect === '/auth'){
          window.location('/auth');
        }
      })
      .catch(e => {
        console.log(e);
        this.logOut();
      });
  }

  logIn(user){
    this.setState({ userLogged: user });
  }

  logOut(){
    axios.get('http://localhost:5000/logout')
      .then(res => this.setState({ userLogged: null }));
  }
  
  render() {
    return (
      <Router>
        <NavBar user={this.state.userLogged} onLogOut={this.logOut}/>
        <br/>
        <Switch>
          <Route path='/' exact component={Feed}/>
          <Route path='/auth'>
            <Auth onLogIn={this.logIn}/>
          </Route>
          <Route path='/chat' component={Chat}/>
          <Route path='/notifications' component={Notifications}/>
          <Route path='/user' component={User}/>
          <Route render={() => <Redirect to='/'/>}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
