import React, {useEffect, useState} from "react"
import Base from "./Base.js"
// import "../styles.css"; 
import { Card } from "./Card.js";
import { FeedContent } from "./FeedContent.js";

export default function Home() {



  // const [data, setData] = useState([]);


  // const getData=()=>{
  //   fetch('http://127.0.0.1:8000/busybeaver/home/'
  //   ,{method:"GET"})
  //     .then(function(response){
  //       console.log(response)
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //       setData(myJson);
  //     });
  //   }

  //   useEffect(() => {
  //     getData();
  //   }, []);

  return (
    <div>
     <Base>
     <center>
       <div class="card w-50 mb-5 mt-3">Search</div>
       <div class="card w-75 mb-5">
         POST
       </div>
     <h3 className="text-left w-75" style={{fontWeight:"bold", marginBottom:"20px"}}>Your Feed</h3>
     <Card class="card w-75 mb-5">
       <FeedContent
       avatarImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
       cardTitle='Test Card'
       cardDescription='Just of Testing'
        cardText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " />
     </Card>
     <Card class="card w-75 mb-5">
       <FeedContent
       avatarImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
       cardTitle='Test Card'
       cardDescription='Just of Testing'
        cardText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " />
     </Card>
     <Card class="card w-75 mb-5">
       <FeedContent
       avatarImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
       cardTitle='Test Card'
       cardDescription='Just of Testing'
        cardText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, " />
     </Card>
     
     </center>
    
     </Base>
    </div>
  );
}