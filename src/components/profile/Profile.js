import React, { Component } from 'react';
import AuthService from '../auth/auth-service';
import {Redirect} from 'react-router-dom';

class Profile extends Component{

  constructor(props){
    super(props);
    this.state = {
      editing: false,
      deleted: false
    }
    this.auth = new AuthService();
  }

  handleUpdateBio = () => {
    const bio = document.getElementById(this.props.loggedInUser.username + 'Bio').value;
    this.auth.service.post('/edit-profile', {
      _id: this.props.loggedInUser._id,
      bio
    })
      .then( res => {
        this.props.updateUserBio(bio);
        this.setState({
          editing: false
        })
      })
      .catch(err => console.log(err));
  }

  handleDeleteUser = () => {
    this.auth.service.post('/delete-user', {
      _id: this.props.loggedInUser._id,
    })
      .then( res => {
        this.props.logoutUser();
        this.setState({
          deleted: true
        });
      })
      .catch(err => console.log(err));
  }

  render(){
    if(this.state.deleted){
      return <Redirect to='/signup' />
    } else{
      if(this.state.editing){
        return (
          <div className='profile-page'>
              <img src=' ' alt='' className='profile-image'></img>
              <h2>{this.props.loggedInUser.username}'s Profile</h2>
              <h4>Player Bio:</h4>
              <textarea id={this.props.loggedInUser.username + 'Bio'} name="bio" rows='3' defaultValue={this.props.loggedInUser.bio}/>
              <h4>Total Wins:</h4>
              <p>{this.props.loggedInUser.wins}</p>
              <h4>Total Losses:</h4>
              <p>{this.props.loggedInUser.losses}</p>
              <input type='submit' onClick={this.handleUpdateBio} value='Save Changes'/>
              <input type='submit' className='delete-user' onClick={this.handleDeleteUser} value='Delete User'/>
          </div>
        );
      } else{
        return (
          <div className='profile-page'>
            <img src=' ' alt='' className='profile-image'></img>
            <h2>{this.props.loggedInUser.username}'s Profile</h2>
            <h4>Player Bio:</h4>
            <p>{this.props.loggedInUser.bio}</p>
            <h4>Total Wins:</h4>
            <p>{this.props.loggedInUser.wins}</p>
            <h4>Total Losses:</h4>
            <p>{this.props.loggedInUser.losses}</p>
            <button onClick={() => { this.setState({editing: true}) }}>Edit Profile</button>
            <input type='submit' className='delete-user' onClick={this.handleDeleteUser} value='Delete User'/>
          </div>
        );
      }
    }
  }
}

export default Profile;