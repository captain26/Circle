import React from "react";



export const FeedContent = (props) => {
  return (
    <div className="col p-0">
      <div className="row" style={{ padding: "10px 0px 0px 30px" }}>
        <a href={"/profile/" + props.username} ><img className="rounded-circle shape" src={props.avatarImage} alt="profile" /></a>
        <div className="col-offset-0">
          <a href={"/profile/" + props.username} >
            <p className="pt-0 px-2 my-0" style={{fontWeight:"bold"}}>{props.name}</p>
          </a>
          <div style={{textAlign:"left",paddingLeft:"10px"}} >
            {props.time > 60 ? (props.time > 1440 ? <span style={{ fontSize: "11px", marginBottom: "0px", fontWeight: "400" }}>{Math.round(props.time / 1440)}d</span> : <span style={{ fontSize: "11px", marginBottom: "0px", fontWeight: "400" }}>{Math.round(props.time / 60)}h</span>) :
              <span style={{ fontSize: "11px", marginBottom: "0px", fontWeight: "400" }}>{props.time}m</span>
            }
          </div>
        </div>


      </div>
      <div className="row" style={{ padding: "7px 30px 0px 30px" }}>
        {props.tags.map((tag) => {
          return <a style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}} href={`/company_page/${tag}`}>#{tag}</a>
        })}
      </div>
      <div className="col card-content">
        <p className="" style={{ fontSize: "20px", margin: "5px 0px 0px 0px", fontWeight: "bold" }}>{props.cardTitle}</p>
        <p className="pt-0" style={{whiteSpace: "pre-wrap"}}>{props.cardText}</p>

      </div>

    </div>


  );
}