import React from "react";



export const FeedContent = (props) => {
return (
   <div className="row py-4" style={{paddingRight:"10px", paddingLeft:"10px"}}>
     <div className="col-lg-3">
       <img className="rounded-circle" src={props.avatarImage} alt="profile"/>
     </div>
     <div className="col-lg-9 card-content">
       <h3 className="text-bold">{props.cardTitle}</h3>
       <h5>{props.cardDescription}</h5> 
       <p className="pt-3">{props.cardText}</p>
     </div>
   </div>
);
}