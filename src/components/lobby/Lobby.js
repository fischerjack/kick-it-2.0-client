import React, {Component} from 'react';
import UsersOnlineSidebar from './UsersOnlineSidebar';
import GamesList from './game/GamesList';
import ChatBox from './chat/ChatBox';
import FriendsListSidebar from './FriendsListSidebar';
import GameView from './game/GameView';

class Lobby extends Component{
  constructor(props){
    super(props);
  }

  render(){
    {console.log(this.props.inGame)}
    if(this.props.inGame == null){
      return (
        <div className='lobby'>
          <UsersOnlineSidebar {...this.props} />
          <div className='game-and-chat'>
            <GamesList {...this.props} />
            <ChatBox {...this.props}/>
          </div>
          <FriendsListSidebar />
        </div>
      );
    } else {
      return (
        <div className='lobby'>
          <UsersOnlineSidebar {...this.props} />
          <div className='game-and-chat'>
            <GameView {...this.props} />
            <ChatBox {...this.props}/>
          </div>
          <FriendsListSidebar />
        </div>
      );
    }
    
  }

}

export default Lobby;