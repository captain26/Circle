import React from "react"
import Base from "../core/Base.js"
import {Line} from 'react-chartjs-2';

const yearState = {
  labels: ['', 'February', 'March',
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
           '04 December', '05 December', '06 December', '07 December', '08 December', '09 December', '10 December'],
  datasets: [
    {
      label: 'Price',
      fill: false,
      lineTension: 0.4,
      backgroundColor: '#ffffff',
      borderColor: '#4d52b5',
      borderWidth: 3,
      data: [235, 157, 238, 102, 56, 367, 30, 279, 488, 49]
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

export default function CompanyPage() {
  return (
    <div>
     <Base>
     <h1 style={{margin:"30px"}}>Company Name</h1>
     <div style={{width:"70%", margin:"10px auto"}}>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade active show text-center" id="year" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px",  paddingTop:"20px", paddingBottom:"10px"}}>
        <Line
          data={yearState}
          options={{
            // title:{
            //   display:true,
            //   text:'Stock',
            //   fontSize:20
            // },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
        </div>
        <div class="tab-pane fade" id="month" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px",  paddingTop:"20px", paddingBottom:"10px"}}>
        <Line
          data={monthState}
          options={{
            // title:{
            //   display:true,
            //   text:'Stock',
            //   fontSize:20
            // },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
        </div>
        <div class="tab-pane fade" id="day" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px", paddingTop:"20px", paddingBottom:"10px"}}>
        <Line
          data={dayState}
          options={{
            // title:{
            //   display:true,
            //   text:'Stock',
            //   fontSize:20
            // },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
        </div>
        <div class="tab-pane fade" id="hour" role="tabpanel" style={{marginBottom:"30px"}}>
        <div class="card" style={{backgroundColor: "#ffffff", borderRadius: "10px", paddingTop:"20px", paddingBottom:"10px"}}>
        <Line
          data={hourState}
          options={{
            // title:{
            //   display:true,
            //   text:'Stock',
            //   fontSize:20
            // },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
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
    
    <h1 style={{margin:"20px auto", color:"#707070", width: "70%", textAlign:"left", marginTop: "70px"}}>About The Company</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"70%", margin:"30px auto"}}>
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

    <h1 style={{margin:"20px auto", color:"#707070", width: "70%", textAlign:"left", marginTop: "70px"}}>Company Statistics</h1>
    <div class="card" style={{ borderRadius:"10px", width:"70%", margin:"30px auto"}}>
    <div class="card-body" style={{textAlign: "left"}}>
        <div class="row">
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Market Cap</h6>
          <p class="card-text"> &#8377; 3,499 Cr</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>P/B Ratio</h6>
          <p class="card-text">10.05</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>P/E Ratio</h6>
          <p class="card-text">124.02</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "20px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Industry P/E</h6>
          <p class="card-text">29.51</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Div. Yield</h6>
          <p class="card-text">0.13%</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>Book Value</h6>
          <p class="card-text">  &#8377; 59.25</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>EPS(TTM)</h6>
          <p class="card-text"> &#8377; 4.80</p>
          </div>
          <div class="col-lg-3 col-md-6" style={{marginBottom: "10px"}}>
          <h6 class="card-title" style={{fontWeight: "bold"}}>ROE</h6>
          <p class="card-text">8.1%</p>
          </div>
        </div>
      </div>
    </div>

    <h1 style={{margin:"20px auto", color:"#707070", width: "70%", textAlign:"left", marginTop: "70px"}}>Your Profile</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"70%", height:"200px", margin:"30px auto"}}>
    </div>
    
    <h1 style={{margin:"20px auto", color:"#707070", width: "70%",textAlign:"left", marginTop: "70px"}}>News from Circle Feed</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"70%", height:"800px", margin:"30px auto", overflowY:"scroll"}}>
        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2020/11/24/22/46/prague-5774045_960_720.jpg" class="card-img" alt="pic" height="200px"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2019/08/03/18/24/bird-4382321_960_720.jpg" class="card-img" alt="pic" height="200px"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2019/08/03/18/24/bird-4382321_960_720.jpg" class="card-img" alt="pic" height="200px"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-3" style={{padding:"10px", borderRadius:"10px", width:"90%", margin:"30px auto"}}>
          <div class="row no-gutters">
            <div class="col-lg-4">
              <img src="https://cdn.pixabay.com/photo/2019/08/03/18/24/bird-4382321_960_720.jpg" class="card-img" alt="pic" height="200px"/>
            </div>  
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
    </div>
     </Base>
    </div>
  );
}