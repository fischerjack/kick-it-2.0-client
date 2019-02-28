import React, {Component} from 'react';

class UsersOnlineSidebar extends Component{

  constructor(props){
    super(props);
  }

  
  render(){
    return (
      <div className='users-online-sidebar'>
        <h4>Users Online</h4>
        {this.props.usersOnline.map((user) => {
          return(
            <div key={user._id}>{user.username}</div>
          );
        })}
      </div>
    );
  }
}

 export default UsersOnlineSidebar;