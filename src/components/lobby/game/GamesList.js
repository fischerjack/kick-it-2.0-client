import React, {Component} from 'react';
import Game from './GameView';


class GamesList extends Component{

  constructor(props){
    super(props);
  }

  createNewGame = (e) => {
    // EMIT TO SERVER, SERVER CAPTURES AND CREATES NEW GAME, SERVER ADDS GAME TO LIST AND PROPAGATES NEW LIST
    // this.props.topSocket.emit('SEND_CREATE_NEW_GAME', this.props.loggedInUser);

    e.preventDefault();
    alert('This feature is not available yet...');

  }

  removeGame = () => {
    //EMIT TO SERVER, SERVER SEARCHES FOR AND REMOVES GAME, SERVER PROPAGATES NEW LIST

  }

  render(){
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
        {/* ALL GAMES WILL GO IN A DIV HERE */}
        {/* <div>GAME STARTER FORM GOES HERE</div> */}
        
      </div>
    );
  }
}

 export default GamesList;