import React, { useEffect, useState } from "react"
import { API_IMAGE } from "../../backend.js";
import { Card } from "../../core/Card.js";
import { FeedContent } from "../../core/FeedContent.js";
import { Comments } from "../../core/getcomment.js";
import { getOtherUserPost } from "./helper/otherProfileApis.js";


export const OtherPosts = (props) => {

  const [posts, setPosts] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('user')).token;
  const [likes, setLikes]  = useState([]);
  const username = JSON.parse(sessionStorage.getItem('user')).user.username;
  const [reload, setReload] = useState(false);


  const getPost = (slug) => {
    getOtherUserPost(token,props.slug)
      .then((data) => {
        setPosts(data);
      }).catch(() => setPosts([]))
  }

  useEffect(() => {
    getPost();
  }, [reload]);
  return (
    <div>
    { posts.map((feed, index) => {
             var time = Math.round((new Date().getTime() - new Date(feed.pub_date).getTime())/60000);
        return (
          <center>
            <Card key={index} class="card w-75 mb-5">
              <FeedContent
                avatarImage={`${API_IMAGE}` + feed.author.image}
                cardTitle={feed.title}
                cardDescription={feed.key_insight_1}
                cardText={feed.content}
                name={feed.author.name}
                tags={feed.tag}
                time = {time}
                username = {feed.author.user.username}
              />
                    {/* modal */}
        <div class="modal fade" id="likemodal" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Likes</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                      <div style={{padding: "10px"}}>
                          {likes.map((people,index) => { 
                            return (
                              <div className="row">
                                <div style={{fontWeight:"bold",fontSize:"18px"}}>
                                  {people.username} 
                                </div>
                                <div style={{color: "grey",fontSize: "15px",marginLeft:"25px"}}>
                                  {people.email} 
                                </div>
                              </div>
                            )})}
                      </div>
              </div>
            </div>
          </div>
        </div>
              {/* modal end */}

                <div onClick={() => setLikes(feed.reactions)}>
                  <p data-toggle="modal" data-target="#likemodal" style={{ alignContent: "left", fontSize: "14px", color: "#4d52b5", fontWeight: "bold", textAlign: "left", marginLeft: "15px", cursor: "pointer" }}>{feed.reactions.length} Likes</p>
                </div>

              <Comments slug={feed.slug} image={props.image} reactions={feed.reactions} username={username} reload={reload} setReload={setReload}/>
            </Card>
          </center>
        );
      }) }
      </div>
  ); 
}