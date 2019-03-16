import React, {Component} from 'react';
import $ from 'jquery';
import io from 'socket.io-client';


// //////////////////////////////////////////////////////////////////////////////////////////////////////

// class Map{
//   constructor(canvasWidth, canvasHeight){
//     this.canvasWidth = canvasWidth;
//     this.canvasHeight = canvasHeight;
//     this.mapTerrain = [];
//     this.mapTerrain.push({
//       xCoordinate: 0,
//       yCoordinate: 0,
//       width: 10,
//       height: canvasHeight
//     });
//     this.mapTerrain.push({
//       xCoordinate: canvasWidth - 10,
//       yCoordinate: 0,
//       width: 50,
//       height: canvasHeight
//     });
//     this.mapTerrain.push({
//       xCoordinate: canvasWidth / 3,
//       yCoordinate: canvasHeight - 60,
//       width: canvasWidth / 3,
//       height: 5
//     });
//     this.mapTerrain.push({
//       xCoordinate: canvasWidth / 8,
//       yCoordinate: canvasHeight - 120,
//       width: canvasWidth / 8,
//       height: 5
//     });
//     this.mapTerrain.push({
//       xCoordinate: canvasWidth / 8 * 6,
//       yCoordinate: canvasHeight - 120,
//       width: canvasWidth / 8,
//       height: 5
//     });
//   }

//   draw(ctx){
//     ctx.fillStyle = "black";
//     ctx.beginPath();
//     for (let i = 0; i < this.mapTerrain.length; i++) {
//       ctx.rect(this.mapTerrain[i].xCoordinate, this.mapTerrain[i].yCoordinate, this.mapTerrain[i].width, this.mapTerrain[i].height);
//     }
//     ctx.fill();
//   }
// }


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class Player{


//   /**
//    * Represents a player.
//    * @constructor
//    * @param {number} startingXCoordinate - starting x coordinate of the player (top-left corner)
//    * @param {number} startingYCoordinate - starting y coordinate of the player (top-left corner)
//    * @param {number} up                  - keycode used for jumping (positive y-direction)
//    * @param {number} left                - keycode used for moving left (negative x-direction)
//    * @param {number} right               - keycode used for moving right (positive x-direction)
//    */
//   constructor(startingXCoordinate, startingYCoordinate, up, left, right, kick, spriteSrc){
//     this.xCoordinate = startingXCoordinate;                   //The x coordinate of the player (top-left corner)
//     this.yCoordinate = startingYCoordinate;                   //The y coordinate of the player (top-left corner)
//     this.width = 40;
//     this.height = 50;
//     this.speed = 3;
//     this.xVelocity = 0;
//     this.yVelocity = 0;
//     this.friction = 0.9;
//     this.gravity = 0.25;
//     this.jumping = false;
//     this.grounded = false;
//     this.collisionDirection = '';

//     //playerDirection is either 0 or 50, which will move vertically between the two symmetric levels in the sprite sheet
//     this.playerDirection = 50;

//     this.up = up;
//     this.left = left;
//     this.right = right;
//     this.kick = kick;
//     this.playerImage = new Image();
//     this.playerImage.src = spriteSrc;
//     this.spriteArrays = [[0,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]]; //[[Idle],[Punch],[Kick],[Block],[Jump],[Run],[Hurt]]
//     this.currentSpriteArray = this.spriteArrays[0];
//     this.frameIndex = 0;
//     this.ticksCount = 0;
//     this.ticksPerFrame = 15;
//     this.numberOfFrames = this.currentSpriteArray.length - 1;
    
//   }
//   /**
//    * Represents the possible actions that the player can take (movement, attacking, blocking...)
//    * @param {boolean[]} keyArr           - each index represents a keycode and the true/false value of that index represents the state of the key press
//    */
//   action(keyArr){
//     if(keyArr[this.up]){
//     if(!this.jumping && this.grounded){
//       this.jumping = true;
//       this.grounded = false;

//       //SET SPRITE ANIMATIONS TO JUMPING - NEED TO CHECK FOR A BETTER WAY TO DO THIS IN THE FUTURE
//       this.currentSpriteArray = this.spriteArrays[4];
//       this.numberOfFrames = this.currentSpriteArray.length - 1;
//       //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//       this.yVelocity = -this.speed*2;
//     }
//     }
//     if(keyArr[this.left]){
//       if(this.xVelocity < this.speed){
//         this.xVelocity++;
//       }
//       this.playerDirection = 0;
//       //SET SPRITE ANIMATIONS TO RUNNING IF NOT JUMPING - NEED TO CHECK FOR A BETTER WAY TO DO THIS IN THE FUTURE
//       if(this.jumping == false){
//         this.currentSpriteArray = this.spriteArrays[5];
//         this.numberOfFrames = this.currentSpriteArray.length - 1;
//       }
//       //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//     }
//     if(keyArr[this.right]){
//       if(this.xVelocity > -this.speed){
//         this.xVelocity--;
//       }
//       this.playerDirection = 50;
//       //SET SPRITE ANIMATIONS TO RUNNING IF NOT JUMPING - NEED TO CHECK FOR A BETTER WAY TO DO THIS IN THE FUTURE
//       if(this.jumping == false){
//         this.currentSpriteArray = this.spriteArrays[5];
//         this.numberOfFrames = this.currentSpriteArray.length - 1;
//       }
//       //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//     }
    

//     this.xVelocity *= this.friction;
//     this.yVelocity += this.gravity;

//     if(this.grounded){
//       this.yVelocity = 0;
//     }

//     this.xCoordinate += this.xVelocity;
//     this.yCoordinate += this.yVelocity;
//     this.grounded = false;
//   }

//   attack(keyArr, player){
//     if(keyArr[this.kick]){
//       //SET SPRITE ANIMATIONS TO JUMPING - NEED TO CHECK FOR A BETTER WAY TO DO THIS IN THE FUTURE
//       this.currentSpriteArray = this.spriteArrays[2];
//       this.numberOfFrames = this.currentSpriteArray.length - 1;
//       //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//       if(this.xCoordinate === player.xCoordinate + 40){
//         player.xVelocity -= 12;
//         player.yVelocity -= 1;
//       }
//       if(this.xCoordinate === player.xCoordinate - 40){
//         player.xVelocity += 12;
//         player.yVelocity -= 1;
//       }
//     }
//   }

//   respawn(map){
//     if(this.yCoordinate > map.canvasHeight){
//       this.xCoordinate = map.canvasWidth / 2;
//       this.yCoordinate = map.canvasHeight / 2;
//       this.xVelocity = 0;
//       this.yVelocity = 0;
//     }
    
    
//   }

//   collisionPrevention(){
    
//     if (this.collisionDirection === "l" || this.collisionDirection === "r") {
//       this.xVelocity = 0;
//       this.jumping = false;
//     } else if (this.collisionDirection === "b") {
//       this.grounded = true;
//       this.jumping = false;
//     } else if (this.collisionDirection === "t") {
//       this.yVelocity *= -1;
//     }
//   }

//   spriteUpdate(){
//     this.numberOfFrames = this.currentSpriteArray.length - 1;
//     this.ticksCount++;
//     if(this.ticksCount > this.ticksPerFrame){
//       this.ticksCount = 0;
//       if(this.frameIndex <  this.numberOfFrames){
//         this.frameIndex++;
//       } else{
//         this.frameIndex = 0;
//       }
//     }
//   }

//   draw(ctx){
//     // ctx.drawImage(this.playerImage, this.frameIndex * this.width, this.playerDirection, 40, 50, this.xCoordinate, this.yCoordinate , 40, 50);
//     ctx.drawImage(this.playerImage, this.currentSpriteArray[this.frameIndex] * this.width, this.playerDirection, 40, 50, this.xCoordinate, this.yCoordinate , 40, 50);
//     this.spriteUpdate();
//   }

// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class GameView extends Component{

  constructor(props){
    super(props);
    this.canvas;
    
    // this.map = new Map(1000, 300);
    // this.players;
    this.keys = [];
    this.game; 
    this.canvasRef = React.createRef();
    this.props.topSocket.on('RECEIVE_KEYS', (game) => {
      console.log(game)
      this.game = game;
    });
  }

  componentDidMount(){
    console.log(this.props)
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');
    
    this.canvas.width = this.props.gameList[0][this.props.loggedInUser._id].map.canvasWidth;
    this.canvas.height = this.props.gameList[0][this.props.loggedInUser._id].map.canvasHeight;
    
    // this.players = [new Player(this.map.canvasWidth / 8 * 3, 180, 38, 39, 37, 191, 'goten-sprite-compressed.png'), 
    //                new Player(this.map.canvasWidth / 8 * 4.5, 180, 87, 68, 65, 70, 'c17super-sprite-compressed.png')];

    $('body')[0].addEventListener('keydown', (e) =>{
      this.keys[e.keyCode] = true;
      this.props.topSocket.emit('SEND_KEYS', {
        _id: this.props.loggedInUser._id,
        keys: this.keys
      });
    });

    $('body')[0].addEventListener('keyup', (e) =>{
      this.keys[e.keyCode] = false;
      this.props.topSocket.emit('SEND_KEYS', {
        _id: this.props.loggedInUser._id,
        keys: this.keys
      });
    });
    
    this.game = {
      map: this.props.gameList[0][this.props.loggedInUser._id].map,
      players: this.props.gameList[0][this.props.loggedInUser._id].players
    }

    this.update();

    // let map = new Map(1000, 300);

    // let players = [new Player(map.canvasWidth / 8 * 3, 180, 38, 39, 37, 191, 'img/goten-sprite-compressed.png'), 
    //               new Player(map.canvasWidth / 8 * 4.5, 180, 87, 68, 65, 70, 'img/c17super-sprite-compressed.png')];

    // let arena = new ArenaController(0.9, 0.25, players, map);

    // window.addEventListener('load', () => {
    //   arena.update();
    // });



  }

  // collisionCheck(shapeA, shapeB){
  //   // get the vectors to check against
  //   let vX = (shapeA.xCoordinate + (shapeA.width / 2)) - (shapeB.xCoordinate + (shapeB.width / 2));
  //   let vY = (shapeA.yCoordinate + (shapeA.height / 2)) - (shapeB.yCoordinate + (shapeB.height / 2))
  //       // add the half widths and half heights of the objects
  //   let hWidths = (shapeA.width / 2) + (shapeB.width / 2);
  //   let hHeights = (shapeA.height / 2) + (shapeB.height / 2);
  //   let colDir = null;
 
  //   // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
  //   if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)
  //       var oX = hWidths - Math.abs(vX);
  //       let oY = hHeights - Math.abs(vY);
  //       if (oX >= oY) {
  //           if (vY > 0) {
  //               colDir = "t";
  //               shapeA.yCoordinate += oY;
  //           } else {
  //               colDir = "b";
  //               shapeA.yCoordinate -= oY;
  //           }
  //       } else {
  //           if (vX > 0) {
  //               colDir = "l";
  //               shapeA.xCoordinate += oX;
  //           } else {
  //               colDir = "r";
  //               shapeA.xCoordinate -= oX;
  //           }
  //       }
  //   }
  //   return colDir;

  // }

  playerDraw(player, ctx){
    player.playerImage = new Image();
    player.playerImage.src = player.spriteSrc;
    // ctx.drawImage(player.playerImage, player.currentSpriteArray[this.frameIndex] * player.width, player.playerDirection, 40, 50, player.xCoordinate, player.yCoordinate , 40, 50);
    ctx.fillStyle = 'red';
    ctx.fillRect(player.xCoordinate, player.yCoordinate, player.width, player.height);
    // player.spriteUpdate();
  }
  
  mapDraw(map, ctx){
    ctx.fillStyle = "black";
    ctx.beginPath();
    for (let i = 0; i < map.mapTerrain.length; i++) {
      ctx.rect(map.mapTerrain[i].xCoordinate, map.mapTerrain[i].yCoordinate, map.mapTerrain[i].width, map.mapTerrain[i].height);
    }
    ctx.fill();
  }


  update(){
    //Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Draw the map
    this.mapDraw(this.game.map, this.ctx);
    //Draw the players
    this.game.players.forEach(element => {
      this.playerDraw(element, this.ctx);  
    });

    //Check player collisions with the map elements and prevent collisions if necessary, then take player actions and draw players
    // this.players.forEach(element => {
    //   for(let i = 0; i < this.map.mapTerrain.length; i++){
    //     element.collisionDirection = this.collisionCheck(element, this.map.mapTerrain[i]);
    //     element.collisionPrevention();
    //   }
    //   this.players.forEach(e => {
    //     if(element !== e){
    //       element.collisionDirection = this.collisionCheck(element, e);
    //       if(element.collisionDirection == 'l' || element.collisionDirection == 'r'){
    //         element.collisionPrevention();
    //       } else if(element.collisionDirection == 't'){
    //         e.grounded = true;
    //         e.jumping = false;
    //         element.jumping = true;
    //       } else if(element.collisionDirection == 'b'){
    //         e.jumping = false;
    //         element.grounded = true;
    //         element.jumping = false;
    //       }
    //       element.attack(this.keys, e);
    //     }
    //   });
      
    // element.action(this.keys);
    // element.respawn(this.map);
    // element.draw(this.ctx);

      //RESET SPRITE ANIMATIONS TO IDLE - NEED TO CHECK FOR A BETTER WAY TO DO THIS IN THE FUTURE
      // if(element.jumping == false){
        // element.currentSpriteArray = element.spriteArrays[0];
        // element.numberOfFrames = element.currentSpriteArray.length - 1;
      // }
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    // });
    
    //Get next animation frame


    requestAnimationFrame(() => this.update());
  }


  render(){
    return (
      <div>
        <h3 className='game-title-ingame'>{this.props.loggedInUser.username.toUpperCase()}'s Game</h3>
        <canvas id='canvas' ref={this.canvasRef}></canvas>
        <button onClick={this.props.endGame}>End Game</button>
      </div>
    );
  }

}

export default GameView;



