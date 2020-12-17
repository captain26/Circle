import React from "react";



export const FeedContent = (props) => {
return (
   <div className="row py-4">
     <div className="col-md-2">
       <img className="rounded-circle" 
       src={props.avatarImage}/>
     </div>
     <div className="col-md-10 text-left">
       <h3 className="text-bold">{props.cardTitle}</h3>
       <h5>{props.cardDescription}</h5> 
       <p className="pt-3">{props.cardText}</p>
     </div>
   </div>
);
}