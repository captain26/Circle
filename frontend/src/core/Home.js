import React, { useEffect, useState, useRef } from "react"
import { API, API_IMAGE } from "../backend.js";
import { getUserProfile, getUserActivity } from "../user/helper/profie.js";
import Base from "./Base.js"
import { Card } from "./Card.js";
import Explore from "./explore.js";
import { FeedContent } from "./FeedContent.js";
import { Comments } from "./getcomment";
import { createpost } from "./helper/createpost";
import Watchlist from "./watchlist";

export default function Home() {
  const [feeds, setData] = useState([]);
  const token = JSON.parse(sessionStorage.getItem('user')).token;
  const username = JSON.parse(sessionStorage.getItem('user')).user.username;
  const [post, setPost] = useState({
    tit: "",
    cont: ""
  });
  const [likes, setLikes]  = useState([]);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);

  const[image,setImage] = useState({});

  const [ticker, setTickers] = useState([]);
  const [company, setCompany] = useState([]);
  const [value, setValue] = useState("");


  const { tit, cont } = post;



  //Set company Tags
  const onTickerClick = (companyname) => {
    setCompany(company => [...company, companyname]);
    setValue("");
  }

  //getImage
  const getImage= () => {
      getUserProfile(token)
      .then((data) => {
        setImage(data);
      })
  }
  
  //Get All Company Tickers
  const getTickerData = () => {
    fetch(`${API}/api/tickers/`
      , { method: "GET" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setTickers(json);
      }).catch(() => setTickers([]));
  }
  //Delete company
  function deleteNote(id) {
    setCompany(company => {
      return company.filter((companyname, index) => {
        return index !== id;
      });
    });
  }
  //Create Post
  const onSubmit = event => {
    event.preventDefault();
    createpost(tit, cont, token,company)
      .then((data) => {
        if (error) {
          console.log(error);
        } else {
          setPost("");
          window.location.reload();
          setReload(!reload);
        }
        return 0;
      })
      .catch(console.log("Error"));
  };

  const handleChange = name => event => {
    setError("");
    setPost({ ...post, [name]: event.target.value });
  };

  //Get All Posts
  const getData = () => {
    fetch(`${API}/api/feed/`
      , { method: "GET" })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setData(json);
      }).catch(() =>setData([]));
  }

  useEffect(() => {
    getData();
    getImage();
    getTickerData();
  }, [reload]);

  return (

    <Base>
   <div style={{marginTop:"0px"}}>
   <Explore/>
   </div>
      <div className="content text-center">
        <div style={{ paddingTop: "100px" }}>
          <center>
            <div class="card w-75 mb-5" style={{ borderRadius: "15px" }}>
              <div className="row py-4" style={{ paddingRight: "10px", paddingLeft: "10px" }}>
                <div className="col-lg-2 p-0"><a  href={"/profile"}  >
                <img className="rounded-circle" style={{ width: "80px", height: "80px", margin: "0px auto" }} src={`${API_IMAGE}`+ image.image} alt="profile" />
                </a>
                  
                </div>
                <div className="col-lg-10" style={{ textAlign: "left", paddingLeft: "0px" }}>
                  <input type="text" placeholder="Title" onChange={handleChange("tit")} style={{ border: "none", outline: "0", width: "auto", fontSize: "18px" }} />
                  <textarea placeholder="Start a Post" onChange={handleChange("cont")}></textarea>
                  <div style={{position:"absolute", zIndex:"1"}}>
                  <div class="p-2" borderRadius="0px" >
                  <input autoComplete="off" onChange={(event) => {
                    setValue(event.target.value);
                  }} value = {value} className="search" placeholder="Tag company" style={{ border: "none", outline: "0" }} type="text" id="search"></input>
                 <div className="card">
                 {ticker.filter((val) => {
                    if (value === "") {
                      return value;
                    } else if (val.ticker_id.toLowerCase().includes(value.toLowerCase())) {
                      return val;
                    }
                  }).slice(0, 10).map((val, key) => {
                    return <div>
                      <ul className="list-group px-4">
                        <div onClick={() => onTickerClick(val.ticker_id)} style={{ cursor: "pointer" }}>
                          {val.ticker_id}
                        </div>
                      </ul>
                    </div>
                  })
                  }
                 </div>
                  </div>
                  </div>
                  <div className="row" style={{padding:"52px 5px 5px 5px"}}>
                      {company.map((company,index) => { 
                        return (
                          <div style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>{company}  <span onClick={() => deleteNote(index)}><i class="fa fa-times" aria-hidden="true"></i></span></div>
                        )})}
                  </div>
                  <div style={{ height: "50px" }}>
                    <button type="button" class="btn" onClick={onSubmit} style={{ backgroundColor: "#4d52b5", color: "white", borderRadius: "25px", padding: "10px 30px", fontWeight: "bold", letterSpacing: "1.5px", position: "absolute", right: "20px" }}>Post</button>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-left w-75" style={{ fontWeight: "bold", marginBottom: "20px" }}>Your Feed</h3>
            <div>



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

              {feeds.map((feed, index) => {
             var time = Math.round((new Date().getTime() - new Date(feed.pub_date).getTime())/60000);
 
                return (
                  
                  <Card key={index} class="card w-75 mb-5">
                    <FeedContent
                      avatarImage={`${API_IMAGE}` + feed.author.image}
                      cardTitle={feed.title}
                      cardDescription={feed.key_insight_1}
                      cardText={feed.content}
                      name={feed.author.name}
                      tags = {feed.tag}
                      time = {time}
                      username = {feed.author.user.username}
                    />
                    <div onClick={() => setLikes(feed.reactions)}>
                    <p data-toggle="modal" data-target="#likemodal" style={{ alignContent: "left", fontSize: "14px", color: "#4d52b5", fontWeight: "bold", textAlign: "left", marginLeft: "15px", cursor: "pointer" }}>{feed.reactions.length} Likes</p>
                    </div>
                    <Comments slug={feed.slug} image={`${API_IMAGE}`+ image.image} reactions={feed.reactions} username={username} reload={reload} setReload={setReload}/>
                  </Card>
                );
              })}
            </div>
          </center>
        </div>
      </div>
      <Watchlist />
    </Base>
  );
}