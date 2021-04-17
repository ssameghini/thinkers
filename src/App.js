import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';

import NavBar from './components/NavBar';
import Feed from "./components/posts/Feed";
import Chat from "./components/chat/Chat";
import Notifications from "./components/notifications/Notifications";
import User from "./components/profile/User";

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/')
  }
  
  render() {
    return (
      <Router>
        <NavBar />
        <br/>
        <Switch>
          <Route path='/' exact component={Feed}/>
          <Route path='/chat' component={Chat}/>
          <Route path='/notifications' component={Notifications}/>
          <Route path='/user' component={User}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
