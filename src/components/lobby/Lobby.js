import React, {Component} from 'react';
import UsersOnlineSidebar from './UsersOnlineSidebar';
import GamesList from './game/GamesList';
import ChatBox from './chat/ChatBox';
import FriendsListSidebar from './FriendsListSidebar';


class Lobby extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='lobby'>
        <UsersOnlineSidebar {...this.props} />
        <div className='game-and-chat'>
          <GamesList />
          <ChatBox {...this.props}/>
        </div>
        <FriendsListSidebar />
      </div>      
    );
  }

}

export default Lobby;