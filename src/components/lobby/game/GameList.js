import React, {Component} from 'react';
import GameJoin from './GameJoin';

class GameList extends Component{

  constructor(props){
    super(props);
    console.log(this.props.gameList);

  }

  createNewGame = (e) => {
    // EMIT TO SERVER, SERVER CAPTURES AND CREATES NEW GAME, SERVER ADDS GAME TO LIST AND PROPAGATES NEW LIST
    // this.props.topSocket.emit('SEND_CREATE_NEW_GAME', this.props.loggedInUser);
    e.preventDefault();
    this.props.createNewGame();
  }

  removeGame = () => {
    //EMIT TO SERVER, SERVER SEARCHES FOR AND REMOVES GAME, SERVER PROPAGATES NEW LIST

  }

  render(){
    console.log(this.props.gameList);
    if(this.props.gameList === undefined){
      return (
        <div className='game-list'>
          <div className='list-title'>
            <h3>GameList</h3>
          </div>
          <div className='list-section'>
          </div>
          <div className='game-create'>
            <button onClick={e => this.createNewGame(e)}>Create a New Game</button>
          </div>
        </div>
      );
    } else{
      return (
        <div className='game-list'>
          <div className='list-title'>
            <h3>GameList</h3>
          </div>
          <div className='list-section'>
          {this.props.gameList.map((game, index) => {
            return <GameJoin username={game._id} key={index} />;
          })}
          </div>
          <div className='game-create'>
            <button onClick={e => this.createNewGame(e)}>Create a New Game</button>
          </div>
        </div>
      );
    }
  }
}

 export default GameList;