import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import './App.css';

import NavBar from './components/NavBar';
import Loading from './components/Loading'
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
      userLogged: {}
    }
  }

  logIn(user){
    this.setState({ userLogged: user });
  }

  logOut(){
    axios.get('http://localhost:5000/logout', { withCredentials: true })
      .then(res => {
        this.setState({ userLogged: null });
        console.log(res.data);
        window.location = '/auth';
      })
      .catch(e => console.log(e));
  }
  
  render() {
    return (
      <Router>
        {this.state.userLogged && <NavBar user={this.state.userLogged} onLogOut={this.logOut}/>}
        <Switch>
          <Route path='/' exact>
            <Loading onAuth={this.logIn}/>
          </Route>
          <Route path='/feed' component={Feed}/>
          <Route path='/auth'>
            <Auth onLogIn={this.logIn} user={this.state.userLogged}/>
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
