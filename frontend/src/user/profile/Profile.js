import React, { useEffect, useState } from "react"
import { API_IMAGE} from "../../backend.js";
import Base from "../../core/Base.js";

import Posts from "./posts";
import Portfolio from "./portfolio";
import './styles.css';
import Activity from "./activity";

import { getFollowers, getFollowing, getUserProfile,editUserProfile} from "../helper/profie.js";
import Explore from "../../core/explore.js";


export default function Profile() {
  const [reload, setReload] = useState(false);
  var formData = new FormData();
  
  const [numberFollowers,setNumberFollowers] = useState();
  const [numberFollowing,setNumberFollowing] = useState();
  
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [profile, setProfile] = useState({});
  const [editProfile, setEditProfile] = useState({})

  const token = JSON.parse(sessionStorage.getItem('user')).token;

  // User Profile
  const getProfile = () => {
      getUserProfile(token)
      .then((data) =>{
        setProfile(data);
        setEditProfile({
          name: data.name,
          bio: data.bio
        })
      })
  }
  //Followers
  const Follower = () => {
    getFollowers(token)
    .then((data) => {
      setNumberFollowers(data.length);
      setFollowers(data);
    }).catch(()=> setFollowers([]));
  }
  //Following
  const Following = () => {
    getFollowing(token)
    .then((data) => {
      setNumberFollowing(data.length);
      setFollowing(data);
    }).catch(() => setFollowing([]))
  }
  //EditProfile
  const onSubmit = () => {
    formData.append("name", editProfile.name);
    formData.append("bio", editProfile.bio);
    if(editProfile.file){
    formData.append("image", editProfile.file);
    }
    editUserProfile(formData, token)
  .catch(err => console.log(err));
  setReload(!reload);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditProfile(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    setEditProfile(prev => {
      return {
        ...prev,
        file: file
      };
    });
  }

  useEffect(() => {
    getProfile();
    Follower();
    Following();
  }, [reload]);

  return (
    <div>
      <Base>
      <Explore/>
        <div className="content text-center">
          <div className="row" style={{ paddingRight: "10px", paddingLeft: "10px",paddingTop:"70px" }}>
            <div className="col-lg-3">
              <img className="rounded-circle" style={{ width: "100px",height:"100px", marginTop: "10px" }} src={`${API_IMAGE}`+ profile.image} alt="profile" />
            </div>
            <div className="col-lg-9" style={{ textAlign: "left", marginTop: "10px" }}>
             <button type="button" className="btn" data-toggle="modal" data-target="#profilemodal" style={{ color: "white", backgroundColor: "#4d52b5", position: "absolute", right: "30px" }}>Edit Profile</button>
              
              {/* modal */}
             <div class="modal fade" id="profilemodal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit Profile</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <form style={{width:"80%", margin:"10px auto"}}>
                      <input type="file" onChange={fileChangedHandler}/>
                      <p style={{fontSize:"7pt" ,color:"grey",paddingBottom:"0px",paddingTop:"5 px"}}>Image size less then 5 MB</p>
                      <div class="form-group" style={{ marginTop: "10px" }}>
                                  <input
                                        name="name"
                                        class="form-control"
                                        onChange={handleChange}
                                        autoComplete="off"
                                        value={editProfile.name}
                                        placeholder="Name"
                                      />
                        </div>
                        <div class="form-group">
                                      <input
                                        name="bio"
                                        class="form-control"
                                        onChange={handleChange}
                                        autoComplete="off"
                                        value={editProfile.bio}
                                        placeholder="Bio"
                                      />
                        </div>
                        <center>
                          <button type="button" data-dismiss="modal" onClick={() => onSubmit()} className="btn" style={{ color: "white", backgroundColor: "#4d52b5", marginTop:"20px" }}>Change</button>
                        </center>
                    </form>   
                                 
              </div>
            </div>
          </div>
        </div>
      
              {/* modal end */}
              
              <h3 style={{fontSize:"20pt" }}>{profile.name}</h3>
              <div className="row" style={{ marginBottom: "5px", }}>

                <div type="button" className="btn" data-toggle="modal" data-target="#followingmodal" className="showFollowLink">
                  <span style={{fontWeight:"bold"}}>{numberFollowing} </span>following
                </div>
                
                <div type="button" className="btn" data-toggle="modal" data-target="#followermodal"   className="showFollowLink"><span style={{fontWeight:"bold"}}>{numberFollowers}</span> followers </div>
                
              </div>
                            {/* following modal */}
             <div class="modal fade" id="followingmodal" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Following</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                    {following.map((people) => {
                      return <a href={"/profile/" + people.user.username}>
                      <div style={{padding: "10px"}}>
                      <div className="row">
                      <img className="rounded-circle" style={{ width: "30px",height:"30px", marginRight: "10px" }} src={`${API_IMAGE}`+ people.image} alt="profile" />
                      <div style={{fontWeight:"bold",fontSize:"18px"}}> 
                      {people.name} 
                      </div>
                      </div>
                        <div style={{color: "grey",fontSize: "15px",marginLeft:"25px"}}>
                          {people.user.email}
                        </div>
                      </div>
                      </a>
                    })}                
              </div>
            </div>
          </div>
        </div>
      
              {/* follower modal end */}


                         {/* following modal */}
             <div class="modal fade" id="followermodal" tabindex="-1" role="dialog">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Followers</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                    {followers.map((people) => {
                      return <a href={"/profile/" + people.user.username}>
                      <div style={{padding: "10px"}}>
                      <div className="row">
                      <img className="rounded-circle" style={{ width: "30px",height:"30px", marginRight: "10px" }} src={`${API_IMAGE}`+ people.image} alt="profile" />
                      <div style={{fontWeight:"bold",fontSize:"18px"}}> 
                      {people.name} 
                      </div>
                      </div>
                        <div style={{color: "grey",fontSize: "15px",marginLeft:"25px"}}>
                          {people.user.email}
                        </div>
                      </div>
                      </a>
                    })}                
              </div>
            </div>
          </div>
        </div>
      
              {/* follower modal end */}
              <p><span  style={{fontWeight:"bold"}}>Bio :</span> {profile.bio}</p>
            </div>
          
          </div>
          <section>
            <ul class="nav nav-tabs" id="myTab" role="tablist" style={{ padding: "0px 30px" }}>
              <li class="nav-item active">
                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true" style={{fontWeight:"500"}}>Posts</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="portfolio-tab" data-toggle="tab" href="#portfolio" role="tab" aria-controls="portfolio" aria-selected="false" style={{fontWeight:"500"}}>Portfolio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="activity-tab" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false" style={{fontWeight:"500"}}>Activity</a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent" style={{ padding: "0px 30px" }}>
              <div class="tab-pane fade active show text-center" id="posts" role="tabpanel" aria-labelledby="posts-tab" style={{ marginTop: "20px" }}>
                <Posts image={`${API_IMAGE}`+ profile.image}/>
              </div>
              <div class="tab-pane fade" id="portfolio" role="tabpanel" aria-labelledby="portfolio-tab">
                <Portfolio/>
              </div>
              <div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="activity-tab">
                <Activity image={`${API_IMAGE}`+ profile.image}/>
              </div>
            </div>
          </section>
        </div>
      </Base>
    </div>
  );
}