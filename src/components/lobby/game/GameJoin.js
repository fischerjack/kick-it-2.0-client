import React, {Component} from 'react';

class GameJoin extends Component{
  
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='game-join'>
        <p className='game-name'>{this.props.username}'sGame</p>
        <button>Join Game</button>
      </div>
    );
  }
}

export default GameJoin;