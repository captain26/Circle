import React, { useEffect, useState } from "react"
import { API, API_IMAGE } from "../../backend.js";
import { Card } from "../../core/Card.js";
import { FeedContent } from "../../core/FeedContent.js";
import { Comments } from "../../core/getcomment.js";
import { getUserPost, editUserPost, deleteUserPost} from "../helper/profie.js";
import EditIcon from "@material-ui/icons/Edit";

import Dropdown from "react-bootstrap/Dropdown";
import { Fab } from "@material-ui/core";


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="threedots" />
  </a>
));

export default function Posts(props) {
  const [tempPost, setTempPost] = useState({
    slug:"",
    title : "",
    content: "",
  })
  const [tempTags, setTempTags] = useState([]);
  const [value, setValue] = useState("");
  const [ticker, setTickers] = useState([]);

  const [posts, setPosts] = useState([]);
  const [likes, setLikes]  = useState([]);
  const token = JSON.parse(sessionStorage.getItem('user')).token;
  const username = JSON.parse(sessionStorage.getItem('user')).user.username;
  const [reload, setReload] = useState(false);

  const getPost = () => {
    getUserPost(token)
      .then((data) => {
        setPosts(data);
      }).catch(() => setPosts([]))
  }

  const editPost = (slug  , title, content, tag) => {
    editUserPost(token, slug, title, content, tag)
      .then((data) => {
        setReload(!reload)
      })
  }

  const deletePost = (slug) => {
    deleteUserPost(token, slug)
      .then((data) => {
        setReload(!reload)
      })
  }

  const onTickerClick = (companyname) => {
    setTempTags(company => [...company, companyname]);
    setValue("");
  }

   //get companyTIckers
   const getData = () => {
    fetch(`${API}/api/tickers/`, { method: "GET" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setTickers(json);
      }).catch(() => setTickers([]));
  };

  const deleteTag = (id) => {
    setTempTags(company => {
      return company.filter((companyname, index) => {
        return index !== id;
      });
    });
  }
  function handleChange(event) {
    const { name,value} = event.target;

    setTempPost(prevPost => {
        return {
            ...prevPost,
            [name]: value
        };
    });
}
  useEffect(() => {
    getPost();
    getData();
  }, [reload]); 

  return (
    <div>
    { posts.map((feed, index) => {
        var time = Math.round((new Date().getTime() - new Date(feed.pub_date).getTime())/60000);
        return (
          <center>

          <Card key={index} class="card w-75 mb-5"> 
          <div style={{position: "absolute", right:"15px", zIndex:"1", top:"5px"}}>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu size="sm" title="">
                  <Dropdown.Item data-toggle="modal" data-target="#editmodal" onClick={ () => { setTempPost({
                    slug: feed.slug,
                    title: feed.title,
                    content: feed.content
                  });
                  setTempTags(feed.tag)
                  }} >Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => deletePost(feed.slug)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </div>
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
              {/* Edit Modal */}
        <div class="modal fade" id="editmodal" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Edit Post
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              
                <div style={{ padding: "10px" }}>
                  <form className="edit-note" >

                  <div style={{position:"absolute", zIndex:"1",width: "90%"}}>
                  <Card class="card p-1" borderRadius="25px" >
                  <input autoComplete="off" onChange={(event) => {
                    setValue(event.target.value);
                  }} value = {value} className="search" placeholder="Tag company" style={{ border: "none", outline: "0" }} type="text" id="search"></input>
                 {ticker.filter((val) => {
                    if (value === "") {
                      return value;
                    } else if (val.ticker_id.toLowerCase().includes(value.toLowerCase())) {
                      return val;
                    }
                  }).slice(0, 10).map((val, key) => {
                    return <div >
                      <ul className="list-group px-4" >
                        <div onClick={() => onTickerClick(val.ticker_id)} style={{ cursor: "pointer" }}>
                          {val.ticker_id}
                        </div>
                      </ul>
                    </div>
                  })
                  }
            </Card>

                 </div>
                  <div className="row" style={{padding:"58px 5px 5px 10px"}}>
                      {tempTags.map((company,index) => { 
                        return (
                          <div style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>{company}  <span onClick={() => deleteTag(index)}><i class="fa fa-times" aria-hidden="true"></i></span></div>
                        )})}
                  </div>
                  <p style={{color:"grey", textAlign: "left", marginBottom: "0px", marginLeft: "3px"}}>Title</p>
                    <input name="title" value={tempPost.title} onChange={handleChange} style={{fontSize: "18px"}}/>
                    <hr style={{marginBottom: "5px", marginTop: "5px"}}></hr>
                  <p style={{color:"grey", textAlign: "left", marginBottom: "0px", marginLeft: "3px"}}>Content</p>
                    <textarea name="content" rows="3" value={tempPost.content} onChange={handleChange} style={{fontSize: "18px"}}/>
                    <Fab className="edit" data-dismiss="modal" onClick={() => editPost(tempPost.slug,tempPost.title,tempPost.content,tempTags)} style={{ position: "absolute", right: "30px" }}>
                <EditIcon />
            </Fab>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> 
        {/* Edit modal end*/}

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