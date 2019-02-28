import React, {Component} from 'react';
import io from 'socket.io-client';

class ChatBox extends Component{

  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    
    //EMIT MESSAGE
    this.props.topSocket.emit('SEND_MESSAGE', {
      username: this.props.loggedInUser.username,
      message: this.state.message
    });

    //RESET STATE
    this.setState({
      message: '',
    });
  }

  render(){
    
    return (
      <div className='chat-box'>
        <h4 className='chat-title'>Global Chat</h4>
        <div className='chat-history'>
          {this.props.messageHistory.map((message, index)=>{
            return (
              <div key={index}>{message['username']}: {message['message']}</div>
            )
          })}
        </div>
        <div className='chat-submit'>
          <form onSubmit={(e) => this.handleFormSubmit(e)}>
            <input type='text' name="message" value={this.state.message} onChange={(e) => this.handleChange(e)}></input>
            <input type="submit" value="Send"></input>
          </form>
        </div>
      </div>
    );
  }
}

 export default ChatBox;