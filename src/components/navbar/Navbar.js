import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Navbar extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loggedInUser: null
    };
    
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      ...this.state,
      loggedInUser: nextProps['userInSession']
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
              <button onClick={() => this.props.logoutUser()}>Logout</button>
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