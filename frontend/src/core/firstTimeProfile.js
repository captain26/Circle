import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import {API} from "../backend";

export default function FirstTimeProfile() {
    const [userProfile, setUserProfile] = useState({});
    var formData = new FormData();
    const [imageURL, setImageURL] = useState("");
    const [newUserProfile, setNewUserProfile] = useState({
        name: "",
        bio: "",
        username: "",
        email:""
      });
    const token = JSON.parse(sessionStorage.getItem('user')).token;
    
  const onSubmit = () => {
    formData.append("name", newUserProfile.name);
    formData.append("bio", newUserProfile.bio);
    if(newUserProfile.file){
    formData.append("image", newUserProfile.file);
    }
        putUserProfile(formData)
      .catch(err => console.log(err));
  }

  const putUserProfile = (formdata) => {
    return fetch(`${API}/api/userprofile/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`
      },
      body: formdata
    })
      .then(response => {
      })
      .catch(err => console.log(err));
  }

  const getUserProfile = () => {
     fetch(`${API}/api/userprofile/`
      , {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
          setUserProfile(json);
          setNewUserProfile({
            name: `${json.name}`,
            bio: `${json.bio}`,
            username: `${json.user.username}`,
            email: `${json.user.email}`
        })
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewUserProfile(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }


  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    setImageURL(URL.createObjectURL(file));
    setNewUserProfile(prev => {
      return {
        ...prev,
        file: file
      };
    });
  }

  useEffect(() => {
      getUserProfile();
  }, []);

  return (
  <div>
    <div className="row" style={{margin:"0px"}}>
        <div className="col-md-4" style={{backgroundColor:"#4d52b5", display:"flex",  justifyContent:"center",  alignItems:"center", minHeight:"100vh"}}>
            <h2 style={{color:"white"}}>BusyBeaver</h2>
        </div>
        <div className="col-md-8" style={{backgroundColor:"white",  display:"flex", justifyContent:"center",  alignItems:"center", minHeight:"100vh"}}>
            <form style={{width:"50%"}}>
            <p>CREATE PROFILE</p>
            <hr></hr>
            <center>
            {imageURL === "" ? null : <img src={imageURL} alt="Profile" style={{borderRadius: "50%", marginBottom:"30px"}} height="230px" width="220px"></img>}
            </center>
        <div class="form-group" style={{ marginTop: "10px" }}>
            <input type="file" onChange={fileChangedHandler}/>
            </div>
        <div class="form-group" style={{ marginTop: "10px" }}>
                <input
                      name="name"
                      class="form-control"
                      onChange={handleChange}
                      autoComplete="off"
                      value={newUserProfile.name}
                      placeholder="Name"
                    />
            </div>
            <div class="form-group" style={{ marginTop: "10px" }}>
                <input
                      name="username"
                      class="form-control"
                      autoComplete="off"
                      value = {newUserProfile.username}
                      placeholder="Username"
                    />
            </div>
            <div class="form-group" style={{ marginTop: "10px" }}>
                <input
                      name="email"
                      class="form-control"
                      autoComplete="off"
                      value={newUserProfile.email}
                      placeholder="Email"
                    />
            </div>
            <div class="form-group">
                    <input
                      name="bio"
                      class="form-control"
                      onChange={handleChange}
                      autoComplete="off"
                      value={newUserProfile.bio}
                      placeholder="Bio"
                    />
            </div>
            <div className="row">
              <div className="col-sm-6">
              <center>
            <Link to="/portfoliosetup"><button type="button" onClick={() => onSubmit()} className="btn" style={{ color: "white", backgroundColor: "#4d52b5", marginTop:"30px" }}>Create Profile</button></Link>
            </center>       
              </div>
              <div className="col-sm-6">
              <center>
            <Link to="/"><button type="button" className="btn" style={{ color: "white", backgroundColor: "#4d52b5", marginTop:"30px" }}>Skip</button></Link>
            </center>       
              </div>
            </div>
        </form>
        </div>
    </div>
  </div>
  );
}