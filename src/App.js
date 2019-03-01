
//Necessary react imports
import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

//Styling
import logo from './logo.svg';
import './App.css';

//My components
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Profile from './components/profile/Profile';
import Lobby from './components/lobby/Lobby';
import io from 'socket.io-client';



class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      loggedInUser: null,
      messageHistory: [],
      usersOnline: [],
      inGame: null
    };

    this.topSocket = io('localhost:5000');

    this.topSocket.on('RECEIVE_MESSAGE', (data) => {
      this.addMessage(data);
    });

    this.topSocket.on('RECEIVE_NEW_USER_ONLINE', (user) => {
        console.log(user);
        this.updateUsersOnline(user);
        console.log(user);
    });

    this.topSocket.on('RECEIVE_DELETE_FROM_USERS_ONLINE', (user) => {
      console.log(user);
      this.updateUsersOnline(user);
      console.log(user);
    });

  }

  handleWindowBeforeUnload = (e) => {
    this.topSocket.emit('SEND_DELETE_FROM_USERS_ONLINE', this.state.loggedInUser);
    return;
  }

  componentDidMount() {
    window.addEventListener("beforeunload", e => this.handleWindowBeforeUnload(e));
  }
  
  componentWillUnmount() {
    window.removeEventListener("beforeunload", e => this.handleWindowBeforeUnload(e));
  }


  updateUsersOnline = (usersOnline) => {
    this.setState({
      usersOnline: usersOnline
    });
  }

  // deleteFromUsersOnline = (user) => {
  //   const usersOnlineCopy = this.state.usersOnline;
  //   const indexToRemove = usersOnlineCopy.findIndex((element) => {
  //     return element._id === user._id;
  //   });
  //   usersOnlineCopy.splice(indexToRemove, 1);

  //   this.setState({
  //     usersOnline: usersOnlineCopy
  //   });
  // }

  // addToUsersOnline = (usersOnline) => {
  //   console.log(usersOnline);
  //   this.setState({
  //     usersOnline: usersOnline
  //   });
  //   console.log(this.state.usersOnline)
  // }

  addMessage = (data) => {
    const {username, message} = data;
    this.setState({
      messageHistory: [...this.state.messageHistory, {username, message}]
    });
  }

  fetchUser(){
    if(this.state.loggedInUser === null){
      this.service.loggedin()
        .then(res => {
          this.setState({
            loggedInUser: res
          });
        })
        .catch( err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }
  
  getTheUser = (userObj) => {
    
    this.setState({
      loggedInUser: userObj,
      messageHistory: []
    });
    
    if(this.state.loggedInUser !== null){
      this.topSocket.emit('SEND_MESSAGE', {
        username: 'Login Notifier',
        message: `${userObj.username} has logged in`
      });
      this.topSocket.emit('SEND_NEW_USER_ONLINE', { ...userObj });
    }
    
  }

  render() {
    if(this.state.loggedInUser){
      return (
        <div className='container'>
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} topSocket={this.topSocket}></Navbar>
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} messageHistory={this.state.messageHistory} topSocket={this.topSocket} usersOnline={this.state.usersOnline} exact path='/' component={Lobby}/>
            <ProtectedRoute user={this.state.loggedInUser} exact path='/profile' component={Profile}></ProtectedRoute>
          </Switch>
          <div className='footer'></div>
        </div>
      );  
    } else{
      return (
        <div>
          <Navbar userInSession={this.state.loggedInUser}></Navbar>
          <Switch>
            <Route exact path='/signup'render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/' render={() => <Login getUser={this.getTheUser} />}/>
          </Switch>
        </div>
      );  
    }
  }
}

export default App;
