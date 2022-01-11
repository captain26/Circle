import React, { useEffect, useState } from "react";
import "./chatBody.css";
import ChatContent from "../chatContent/ChatContent";
import {API, API_IMAGE, API_CHAT} from "../../../backend";
import WebSocketInstance from "../../../services/WebSocket";
import Avatar from "../Avatar";

export default function ChatBody() {

  const [profile, setProfile] = useState([]);
  const [reload, setReload] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  
  const token = JSON.parse(sessionStorage.getItem('user')).token;
  const currentUser=JSON.parse(sessionStorage.getItem('user')).user.username;

  const [users, setUsers] = useState([]);
  const [otherUser, setOtherUser] = useState("");
  const [otherUserImage, setOtherUserImage] = useState("");

  const getUsers = () => {
    fetch(`${API}/api/userprofiles/`,
    {
      method:"GET",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
    }).then((data)=> {return data.json()}
    ).then((list) =>{
      setUsers(list);
    })
  }

  const getProfile = () => {
    fetch(`${API}/api/userprofile/`,
    {
      method:"GET",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
    }).then((data)=> {return data.json()}
    ).then((list) =>{
      setProfile(list);
      setOtherUserImage(list.image);
      setOtherUser(list.name);
    })
  }

  const selectChat = (e) => {
    for (let index = 0; index < e.currentTarget.parentNode.children.length;  index++ ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };

  const WebSocketConnection = (username, user_id, image) => {
    setOtherUser(username);
    setOtherUserImage(image);
    WebSocketInstance.connect(`${API_CHAT}/chat/` + user_id + '/');
    setReload(!reload);
    setFirstTime(false);
  }

  useEffect(() => {
    getUsers();
    getProfile();
  },[]);
    return (
      <center>
      <div className="main__chatbody">
      <div className="main__chatlist">
        {/* <button className="btn">
          <i className="fa fa-plus"></i>
          <span>  New conversation</span>
        </button> */}
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {users.map((item, index) => {
            if(item.user.username !== currentUser){
              return (
                      <div onClick={() => WebSocketConnection(item.user.username, item.user.id, item.image)}>
                <div style={{ animationDelay: `0.${index + 1}s`, paddingRight: "50px", textAlign:"left"}} onClick={() => selectChat}  className={`chatlist__item ${index === 0 ? "active" : ""} `}>
                  <Avatar image={API_IMAGE + item.image} isOnline={item.isOnline} />
                  <div className="userMeta">
                    <p>{item.name}</p>
                    <span className="activeTime">32 mins ago</span>
                  </div>
                </div>
                </div>
              ); 
            }
          })}
        </div>
      </div>
      {!firstTime ? reload ?
        <ChatContent currentUser={currentUser} image_src = {profile.image} otherUser={otherUser} otherUserImage={otherUserImage}/>
      :
      <div className="main__chatcontent"><ChatContent currentUser={currentUser} image_src = {profile.image} otherUser={otherUser} otherUserImage={otherUserImage}/></div>

      : null}
      
      </div>
      </center>
    );
}
