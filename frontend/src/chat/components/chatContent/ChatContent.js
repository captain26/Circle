import React, { Component, useState, createRef, useEffect } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import WebSocketInstance from "../../services/WebSocket"

export default class ChatContent extends Component {




  constructor(props) {
    super(props);
    this.state = {}
    this.waitForSocketConnection(() => {
      WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
      WebSocketInstance.fetchMessages(this.props.currentUser);
    });
}

waitForSocketConnection(callback) {
    const component = this;
    setTimeout(
        function () {
        if (WebSocketInstance.state() === 1) {
            console.log("Connection is made")
            callback();
            return;
        } else {
            console.log("wait for connection...")
            component.waitForSocketConnection(callback);
        }
    }, 100);
}

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

sendMessageHandler = (e) => {
  const currentUser = JSON.parse(localStorage.getItem("user")).user.username;
    e.preventDefault();
    const messageObject = {
        from: currentUser,
        content: this.state.message,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
        message: ''
    });
}

renderMessages = (messages) => {
    const currentUser = JSON.parse(localStorage.getItem("user")).user.username;
    console.log(currentUser);
    return messages.map((message, i) => (
      <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${currentUser === message.author ? 'me': 'other'}`}
    >
      {console.log(message.author)}
      <div className="chat__item__content">
        <div className="chat__msg">{message.content}</div>
        <div className="chat__meta">
          <span>{Math.round((new Date().getTime() - new Date(message.timestamp).getTime())/60000)} minutes ago</span>
        </div>
      </div>
      <Avatar isOnline="active" image="http://emilcarlsson.se/assets/mikeross.png" />
    </div>
    ));
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

  render() {

    const messages = this.state.messages;
    const username = JSON.parse(localStorage.getItem("user")).user.username;

    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>{username}</p>
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
          <form onSubmit={this.sendMessageHandler}>
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
            <button id="chat-message-submit" className="submit">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
