import React, {Component} from 'react';
import UsersOnlineSidebar from './UsersOnlineSidebar';
import GameList from './game/GameList';
import ChatBox from './chat/ChatBox';
import FriendsListSidebar from './FriendsListSidebar';
import GameView from './game/GameView';

class Lobby extends Component{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.inGame == false){
      return (
        <div className='lobby'>
          <UsersOnlineSidebar {...this.props} />
          <div className='game-and-chat'>
            <GameList {...this.props} createNewGame={this.props.createNewGame}/>
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
            <GameView {...this.props} endGame={this.props.endGame}/>
            <ChatBox {...this.props}/>
          </div>
          <FriendsListSidebar />
        </div>
      );
    }
    
  }

}

export default Lobby;