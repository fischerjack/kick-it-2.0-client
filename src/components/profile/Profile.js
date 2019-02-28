import React, { Component } from 'react';


class Profile extends Component{

  constructor(props){
    super(props);
    this.state = {
      loggedInUser: null
    };
  }

  render(){
    return (
      <div>
        <h3>You are on the profile</h3>
      </div>
    );
  }

}

export default Profile;