import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../auth/auth-service';

class Navbar extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      ...this.state,
      loggedInUser: nextProps['userInSession']
    });
  }

  logoutUser = () => {
    this.service.logout()
      .then(() => {
        const user = this.state.loggedInUser;
        this.props.topSocket.emit('SEND_MESSAGE', {
          username: `Logout Notifier`,
          message: `${user.username} has logged out`
        });
        this.props.topSocket.emit('SEND_DELETE_FROM_USERS_ONLINE', user);
        this.setState({
          loggedInUser: null
        });
        this.props.getUser(null);
      });
  }
  
  render(){
    if(this.state.loggedInUser){
      return (
        <nav className='nav-style'>
          <div>Welcome, {this.state.loggedInUser.username}</div>
          <div><Link to='/'>Lobby</Link></div>
          <div><Link to='/profile'>Profile</Link></div>
          <div>
            <Link to={'/'}>
              <button onClick={() => this.logoutUser()}>Logout</button>
            </Link>
          </div>
        </nav>
      );
    } else {
      return (
        <div>
          <nav className='nav-style'>
            <div>KICK IT!</div>
            <div><Link to='/'>Login</Link></div>
            <div><Link to='/signup'>Signup</Link></div>
          </nav>
        </div>
      );
    }

    

    // return (
    //   <nav className='nav-style'>
    //     <ul style={{padding: '0'}}>
    //       <li><Link to='/projects' style={{textDecoration: 'none'}}>Projects</Link></li>
    //     </ul>
    //   </nav>
    // );
  }
  
}

export default Navbar;