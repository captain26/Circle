import React, { useEffect, useState } from "react"
import { API_IMAGE} from "../../backend.js";
import { Card } from "../../core/Card.js";
import { FeedContent } from "../../core/FeedContent.js";
import { Comments } from "../../core/getcomment.js";
import { getUserActivity} from "../helper/profie.js";

export default function Activity(props) {

const [activity, setActivity] = useState([]);
const token = JSON.parse(sessionStorage.getItem('user')).token;
const [likes, setLikes]  = useState([]);
const username = JSON.parse(sessionStorage.getItem('user')).user.username;
const [reload, setReload] = useState(false);

const Activity = () => {
    getUserActivity(token)
    .then((data) => {
    setActivity(data);
}).catch(() => setActivity([]))
}

useEffect(() => {
    Activity();
  }, [reload]);
    
  return (
        <div style={{marginTop:"20px"}}>
       {activity.map((feed, index) => {
             var time = Math.round((new Date().getTime() - new Date(feed.post.pub_date).getTime())/60000);
                  return (
                    <center>
                      <Card key={index} class="card w-75 mb-5">
                        <FeedContent
                          avatarImage={`${API_IMAGE}` + feed.post.author.image}
                          cardTitle={feed.post.title}
                          cardText={feed.post.content}
                          name={feed.post.author.name}
                          tags={feed.post.tag}
                          slug = {feed.post.slug}
                          reaction = {feed.reaction_type}
                username = {feed.post.author.user.username}
                time = {time}
                        />
                             {/* modal */}
        <div class="modal fade" id="useractivitylikemodal" tabindex="-1" role="dialog">
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

                <div onClick={() => setLikes(feed.post.reactions)}>
                  <p data-toggle="modal" data-target="#useractivitylikemodal" style={{ alignContent: "left", fontSize: "14px", color: "#4d52b5", fontWeight: "bold", textAlign: "left", marginLeft: "15px", cursor: "pointer" }}>{feed.post.reactions.length} Likes</p>
                </div>
                        <Comments slug={feed.post.slug} image={props.image} reactions={feed.post.reactions} username={username} reload={reload} setReload={setReload} />
                      </Card>
 
                    </center>
                  );
                })}
       </div>
  ); 
}