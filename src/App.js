
//Necessary react imports
import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';



//Styling
import './App.css';

//My components
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Profile from './components/profile/Profile';
import Lobby from './components/lobby/Lobby';
import io from 'socket.io-client';


import AuthService from './components/auth/auth-service';


class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      loggedInUser: null,
      messageHistory: [],
      usersOnline: [],
      gameList: [],
      inGame: false,
      authService: new AuthService()
    };
    this.topSocket = io('localhost:5000');

    this.topSocket.on('RECEIVE_MESSAGE', (data) => {
      this.addMessage(data);
    });

    this.topSocket.on('RECEIVE_NEW_USER_ONLINE', (user) => {
        this.updateUsersOnline(user);
    });

    this.topSocket.on('RECEIVE_DELETE_FROM_USERS_ONLINE', (user) => {
      this.updateUsersOnline(user);
    });

    this.topSocket.on('RECEIVE_UPDATE_GAMELIST', (gameList) => {
      console.log(gameList);
      this.setState({
        gameList
      })
    });

    this.topSocket.on('RECEIVE_END_GAME', (data) => {
      console.log(data.message);
      this.setState({
        inGame: false,
        gameList: data.gameList
      });
    })
  }

  handleWindowBeforeUnload = (e) => {
    this.topSocket.emit('SEND_END_GAME', this.state.loggedInUser);
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

  updateUserBio = (bio) =>{
    this.setState({
      loggedInUser: {
        ...this.state.loggedInUser,
        bio
      }
    })
  }

  logoutUser = () => {
    this.state.authService.logout()
      .then(() => {
        const user = this.state.loggedInUser;
        this.topSocket.emit('SEND_MESSAGE', {
          username: `Logout Notifier`,
          message: `${user.username} has logged out`
        });
        this.topSocket.emit('SEND_DELETE_FROM_USERS_ONLINE', user);
        this.setTheUser(null);
      });
  }

  createNewGame = () => {
    this.topSocket.emit('SEND_UPDATE_GAMELIST', {
      _id: this.state.loggedInUser._id
    });
    this.setState({
      inGame: true
    })
  }

  endGame = () => {
    this.topSocket.emit('SEND_END_GAME', this.state.loggedInUser);
  }

  addMessage = (data) => {
    const {username, message} = data;
    this.setState({
      messageHistory: [...this.state.messageHistory, {username, message}]
    });
  }
  
  setTheUser = (userObj) => {
    
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
      this.topSocket.emit('SEND_UPDATE_GAMELIST', null);
    }
    
  }

  render() {
    if(this.state.loggedInUser){
      return (
        <div className='container'>
          <Navbar userInSession={this.state.loggedInUser} logoutUser={this.logoutUser}></Navbar>
          <Switch>
            <ProtectedRoute loggedInUser={this.state.loggedInUser} exact path='/' render={() => <Lobby {...this.state} createNewGame={this.createNewGame} endGame={this.endGame}/>}/>
            <ProtectedRoute loggedInUser={this.state.loggedInUser} exact path='/profile' render={() => <Profile loggedInUser={this.state.loggedInUser} updateUserBio={this.updateUserBio} logoutUser={this.logoutUser}/>}/>
          </Switch>
          <div className='footer'></div>
        </div>
      );  
    } else{
      return (
        <div>
          <Navbar userInSession={this.state.loggedInUser}></Navbar>
          <Switch>
            <Route exact path='/signup'render={() => <Signup setTheUser={this.setTheUser} />} />
            <Route path='/' render={() => <Login setTheUser={this.setTheUser} />}/>
          </Switch>
        </div>
      );  
    }
  }
}

export default App;
