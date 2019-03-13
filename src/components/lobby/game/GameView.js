import React, {Component} from 'react';

class GameView extends Component{

  constructor(props){
    super(props);
  }



  render(){
    return (
      <div>
        <h3>YOU MADE IT TO THE GAME VIEW PAGE</h3>
        <p>You weren't supposed to get here...</p>
        <button onClick={this.props.endGame}>End Game</button>
      </div>
    );
  }

}

export default GameView;