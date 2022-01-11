import React, { Component, createRef} from "react";

import "./chatContent.css";
import Avatar from "../Avatar";
import WebSocketInstance from "../../../services/WebSocket"
import {API_IMAGE} from "../../../backend";

export default class ChatContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.waitForSocketConnection(() => {
      WebSocketInstance.initChatUser(this.props.currentUser);
      WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
      WebSocketInstance.fetchMessages(this.props.currentUser);
    });
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
      function () {
        // Check if websocket state is OPEN
        if (WebSocketInstance.state() === 1) {
          console.log("Connection is made")
          callback();
          return;
        } else {
          console.log("wait for connection...")
          component.waitForSocketConnection(callback);
        }
    }, 100); // wait 100 milisecond for the connection...
  }

  messagesEndRef = createRef(null);

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message]});
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse()});
  }

  messageChangeHandler = (event) =>  {
    this.setState({
      message: event.target.value
    })
  }

  sendMessageHandler = (e, message) => {
    const messageObject = {
      from: this.props.currentUser,
      text: message
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: ''
    })
    e.preventDefault();
  }

  renderMessages = (messages) => {
      return messages.map((message, i) => {
      if(message.author === this.props.otherUser || message.author === this.props.currentUser){
      return (
        <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.currentUser === message.author ? 'me': 'other'}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{message.content}</div>
         
          <div className="chat__meta">
            <span>{Math.round((new Date().getTime() - new Date(message.created_at).getTime())/60000)} minutes ago</span>
          </div>
        </div>
        <Avatar image={ message.author === this.props.otherUser ? API_IMAGE + this.props.otherUserImage  : API_IMAGE + this.props.image_src }  />
      </div>
      );
      }
    });
  }

  render() {
    const messages = this.state.messages;
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                  image={API_IMAGE + this.props.otherUserImage}
              />
              <p>{this.props.otherUser}</p>
            </div>
          </div>
          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            { messages &&  this.renderMessages(messages) }
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <form onSubmit={(e) => this.sendMessageHandler(e, this.state.message)}>
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.messageChangeHandler}
              value={this.state.message}
              required 
              id="chat-message-input" 
            />
            <button id="chat-message-submit" className="submit" type="submit">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
