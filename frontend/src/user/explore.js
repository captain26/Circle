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

export default function Explore() {
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
    <h1 style={{margin:"30px auto", color:"#707070", width: "70%", textAlign:"left"}}>Your Profile</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"70%", height:"200px", margin:"30px auto"}}>
    </div>
    <h1 style={{margin:"30px auto", color:"#707070", width: "70%",textAlign:"left"}}>News from Circle Feed</h1>
    <div class="card" style={{padding:"10px", borderRadius:"10px", width:"70%", height:"200px", margin:"30px auto"}}>
    </div>
     </Base>
    </div>
  );
}