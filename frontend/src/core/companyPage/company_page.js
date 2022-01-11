import React, {useState,useEffect} from "react"
import Base from "../Base.js"
import {Line} from 'react-chartjs-2';
import { checkWatchlist, community, company_posts, getValuations, postWatchlist, removeWatchlist } from "./helper/company.js";
import { API_IMAGE } from "../../backend.js";
import { FeedContent} from "../FeedContent";
import { Comments } from "../getcomment";
import { getPrices, getUserProfile } from "../../user/helper/profie";
import YearGraph from "./graphs/year.js";
import DayGraph from "./graphs/day.js";
import MonthGraph from "./graphs/month.js";
import HourGraph from "./graphs/hour.js";

export default function CompanyPage({match}) {

  const ticker_id = decodeURIComponent(match.params.company);
  const encoded_ticker_id = match.params.company;
  const [communityUser, setCommunityUser] = useState([]);
  const [companyPosts, setCompanyPosts] = useState([]);
  const [likes, setLikes]  = useState([]);
  const[image,setImage] = useState({});

  const [checkWatching, setCheckWatching] = useState();

  const [valuations, setValuations] = useState({
    ticker_id: "",
    market_cap: "",
    pe: "",
    book_value: "",
    dividend: "",
    industry_pe: "",
    eps: "",
    price_to_book: "",
    dividend_yield: "",
    face_value: ""
  });

  const username = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).user.username : null;
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null;

  const [price,setPrice] = useState();
  const [reload, setReload] = useState(false);


const yearState = {
  labels: ['January', 'February', 'March',
           'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [367, 576, 235,157, 238, 102, 56, 367, 30, 279, 488, 49]
    }
  ]
}

const monthState = {
  labels: ['01 December', '02 December', '03 December',
           '04 December', '05 December', '06 December', '07 December', '08 December', '09 December', '10 December', '11 December', '12 December', '13 December',
           '14 December', '15 December', '16 December', '17 December', '18 December', '19 December', '20 December', '21 December', '22 December', '23 December',
           '24 December', '25 December', '26 December', '27 December', '28 December', '29 December', '30 December'],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 0,
      data: [235, 157, 238, 102, 56, 367, 30, 279, 488, 49, 235, 157, 238, 102, 56, 367, 30, 279, 488, 49, 235, 157, 238, 102, 56, 367, 30, 279, 488, 49, ]
    }
  ]
}

const dayState = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [367,  238, 102, 153, 30, 279, 488, 49]
    }
  ]
}

const hourState = {
  labels: ['15:00', '15:10', '15:20',
           '15:30', '15:40', '15:50', '16:00'],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [367, 270, 279, 488, 49, 179, 390]
    }
  ]
}

//PRICE
const Price = () => {
  
  getPrices(token,[ticker_id])
  .then((data) => {
    setPrice(data[ticker_id]);
  })
}
//Valuations Data
const getValuationsData = () => {
  getValuations(token,encoded_ticker_id)
  .then((data) => setValuations(data))
}

  //Comunity User
  const getCommunity = () =>{
    community(encoded_ticker_id)
    .then((data) =>{
      setCommunityUser(data);
    }).catch(() => setCommunityUser([]))
  }
  //CompamySpecific Post
  const getCompanyPosts = () =>{
    company_posts(encoded_ticker_id)
    .then((data) =>{
      setCompanyPosts(data);
    }).catch(() => setCompanyPosts([]))
  }
  //User Profile Image
  const getImage= () => {
    getUserProfile(token)
    .then((data) => {
      setImage(data);
    })
}
  //Watching?
  const Watching = () => {
    checkWatchlist(token,ticker_id)
    .then((data) => {
      setCheckWatching(data)
    })
  }
  
  //add watchlist
  const addWatchlist = () =>{
    let arr = [{ticker_id: ticker_id}]
    postWatchlist(token, arr)
    .then((data) => {
      console.log('watchlist Added Successfully');
      setReload(!reload);
    })
  }  

  //remove watchlist
  const deleteWatchlist = () => {
    removeWatchlist(token,ticker_id)
    .then((data) => {
      console.log('watchlist removed successfully');
      setReload(!reload);
    })
  }


  useEffect(() =>{
      getCommunity();
      sessionStorage.getItem('user') ? getImage() : getCompanyPosts();
    
  },[]);

  //ChangeWatchIcon
  useEffect(() => {
    getCompanyPosts();
    Watching();
    
  },[reload]);

useEffect(() => {
  getValuationsData();
  Price();
  
},[]);

  return (
     <Base>
     {/* <Explore/> */}
     <div className="contentwithoutwatchlist text-center">
     <div style={{paddingTop:"10px"}}>
     

                
     <div style={{width:"70%", margin:"30px auto"}}>
     <div style={{marginBottom: "20px", marginLeft: "5px", textAlign: "left"}}>
        <span style={{marginRight: "20px",fontSize: "35px", fontWeight: "bold"}}>{ticker_id}</span>
        <span>{checkWatching ? (<button
                  onClick={deleteWatchlist}
                  type="button"
                  className="btn"
                  style={{
                    color: "white",
                    position: "absolute",
                    top: "45px",
                    right: "13%",
                    marginBottom: "15px",
                    borderColor:"#4d52b5",
                    backgroundColor:"#4d52b5",
                    borderRadius:"100px",
                  }}
                >
                ⭐ In Watchlist
                </button>)
                :( <button
                  onClick={addWatchlist}
                  type="button"
                  className="btn"
                  style={{
                    color: "black",
                    position: "absolute",
                    top: "45px",
                    right: "13%",
                    marginBottom: "15px",
                    borderColor:"#4d52b5",
                    borderRadius:"100px"
                  }}
                >
                 <span style={{color:"#4d52b5"}}>☆</span> Add to Watchlist
                </button>)

}</span>
        <h2>&#8377; {price}</h2>
        {/* <p style={{color:"#34A853", marginTop:"0px", fontWeight: "bold"}}>&#8377; 12.40 (8.24%)</p> */}
     </div>
     
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade " id="year" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px",  paddingTop:"20px", paddingBottom:"10px"}}>
        <YearGraph/>
      </div>
        </div>
        <div class="tab-pane fade" id="month" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px",  paddingTop:"20px", paddingBottom:"10px"}}>
        <MonthGraph/>
      </div>
        </div>
        <div class="tab-pane fade" id="day" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px", paddingTop:"20px", paddingBottom:"10px"}}>
        <DayGraph/>
      </div>
        </div>
        <div class="tab-pane fade active show text-center" id="hour" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px", paddingTop:"20px", paddingBottom:"10px"}}>
     <HourGraph/>
      </div>
        </div>
      </div>

      <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="hour-tab" data-toggle="tab" href="#hour" role="tab" >1 Hour</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="day-tab" data-toggle="tab" href="#day" role="tab">1 Day</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="month-tab" data-toggle="tab" href="#month" role="tab">1 Month</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="year-tab" data-toggle="tab" href="#year" role="tab">1 Year</a>
        </li>
      </ul>
    </div>
    
   
    <h1 style={{margin:"20px auto", color:"#707070", width: "80%", textAlign:"left", marginTop: "70px"}}>About The Company</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"80%", margin:"30px auto"}}>
      <div class="card-body" style={{textAlign: "left"}}>
        <p class="card-text">Mahindra & Mahindra Ltd. is in Automobiles - Passenger Cars. It was incorporated in year 1945. The current market capitalization stands &#8377; 91,114 Cr. The company is listed on the Bombay Stock Exchange (BSE) with the BSE Code as 500520 and also listed on National STock Exchange (NSE) with NSE code as M&M.</p>
        <div class="row" style={{marginTop: "30px"}}>
          <div class="col-lg-4" style={{marginBottom: "10px"}}>
          <h5 class="card-title" style={{fontWeight: "bold"}}>Organization</h5>
          <p class="card-text" style={{color: "green"}}>Mahindra & Mahindra</p>
          </div>
          <div class="col-lg-4" style={{marginBottom: "10px"}}>
          <h5 class="card-title" style={{fontWeight: "bold"}}>Founded Year</h5>
          <p class="card-text">1945</p>
          </div>
          <div class="col-lg-4" style={{marginBottom: "10px"}}>
          <h5 class="card-title" style={{fontWeight: "bold"}}>Managing Director</h5>
          <p class="card-text" style={{color: "green"}}>Pawan Goenka</p>
          </div>
        </div>
      </div>
    </div>

    <h1 style={{margin:"20px auto", color:"#707070", width: "80%", textAlign:"left", marginTop: "70px"}}>Company Statistics</h1>
    <div class="card" style={{ borderRadius:"10px", width:"80%", margin:"30px auto"}}>
    <div class="card-body" style={{textAlign: "left"}}>
        <div class="row">
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Market Cap</h6>
          <p class="card-text"> &#8377; {valuations.market_cap}</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>P/B Ratio</h6>
          <p class="card-text">{valuations.price_to_book}</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>P/E Ratio</h6>
          <p class="card-text">{valuations.pe}</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Industry P/E</h6>
          <p class="card-text">{valuations.industry_pe}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Div. Yield</h6>
          <p class="card-text">{valuations.dividend_yield}%</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Book Value</h6>
          <p class="card-text">  &#8377; {valuations.book_value}</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>EPS(TTM)</h6>
          <p class="card-text"> &#8377; {valuations.eps}</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>ROE</h6>
          <p class="card-text">8.1%</p>
          </div>
        </div>
      </div>
    </div>

    <h1 style={{margin:"20px auto 0px auto", color:"#707070", width: "80%", textAlign:"left", marginTop: "70px"}}>Community</h1>
    <p style={{margin :"auto", color:"#707070", width: "80%", textAlign:"left"}} >People who own or watch this stock</p>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"80%", margin:"30px auto"}}>
          <div style={{overflowWrap:"break-word",wordWrap:"break-word",textAlign:"left"}}>
          {communityUser.length == 0 ? <div><p style={{color:"grey",textAlign:"center",paddingTop:"60px"}}>No one in your community has own this stock</p></div>:
            communityUser.map((user) => {
              return<div>
              <a href={"/profile/" + user.user.username}><img alt="user" src={`${API_IMAGE}`+ user.image} className="rounded-circle" style={{width:"70px",height:"70px",padding:"10px"}}/> </a>
              <p>{user.name}</p>
              </div>
          })}
         </div>
    </div>
        
    <h1 style={{margin:"20px auto", color:"#707070", width: "80%",textAlign:"left", marginTop: "70px"}}>Posts from Circle Feed</h1>

    { companyPosts.map((feed, index) => {
             var time = Math.round((new Date().getTime() - new Date(feed.pub_date).getTime())/60000);
        return (
          <center>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"80%", margin:"30px auto"}}>
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
              { sessionStorage.getItem('user') === null ? 
              
              <div>
                <hr
                  width="90%"
                  size="1"
                  textAlign="center"
                  style={{ margin: "auto", marginBottom: "10px" }}
                />
              <div className="row">
                <div className="col-sm-6">
                  <span style={{ fontSize: "18px", cursor: "pointer" }}>
                  <a href={"http://localhost:3000/signin/" + ticker_id }><i class="fa fa-thumbs-up"></i> Like</a>
                  </span>
                </div>
                <div className="col-sm-6">
                  <span style={{ fontSize: "18px", cursor: "pointer" }}>
                    <a href={"http://localhost:3000/signin/" + ticker_id }><i class="fa fa-comments"></i> Comment</a>
                  </span>
                </div>
              </div>
                <hr
                  width="90%"
                  size="1"
                  textAlign="center"
                  style={{ margin: "10px auto" }}
                />
              </div>
              : <Comments slug={feed.slug} image={`${API_IMAGE}`+ image.image} reactions={feed.reactions} username={username} reload={reload} setReload={setReload}/>}
</div>
          </center>



        );
      }) }



    </div>
    </div>
     </Base>
  );
}