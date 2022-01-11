import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { postNote } from "./helper/postNote";
import { API } from "../../backend";
import {Card} from "../../core/Card";

function CreateArea(props) {

  const [value, setValue] = useState("");
  const [ticker, setTickers] = useState([]);
  const [company, setCompany] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: "",
    company:""
  });
  const token = JSON.parse(sessionStorage.getItem('user')).token;

  const {title,content} = note;

  //Set company Tags
  const onClick = (companyname) => {
    setCompany(company => [...company, companyname]);
    setValue("");
  }
  //Delete Note
  function deleteNote(id) {
    setCompany(company => {
      return company.filter((companyname, index) => {
        return index !== id;
      });
    });
  }

//Get All Company Tickers
  const getData = () => {
    fetch(`${API}/api/tickers/`
    ,{method: "GET"})
    .then(function(response){
      return response.json();
    })
      .then(function(json) {
      setTickers(json);  
    }).catch(() => setTickers([]));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  //Create Notes
  const submitNote = (event) => {
      postNote(token,title,content,company)
      .then((res) => {
        props.setReload(!props.reload);
        setNote({
          title: "",
          content: "",
          company:""
        });
        setCompany([]);
      })
      .catch((err) => console.log(err));
    setNote({
      title: "",
      content: "",
      company:""
    });
    event.preventDefault();
  }
  
  useEffect(() => {
    getData();
  },[]);

  return (
    <div>
        <div style={{position:"absolute", zIndex:"1", width:"80%", marginLeft:"30px", marginTop:"10px"}}>
     <Card class="card p-2" borderRadius="30px" >
     <input autoComplete="off" onChange={(event) => {
       setValue(event.target.value);
     }} value={value} className= "search" placeholder="Search Company" style={{border: "none", outline:"0"}} type="text" id="search"></input>
     {ticker.filter((val) =>{
       if(value === ""){
         return value;
       }else if(val.ticker_id.toLowerCase().includes(value.toLowerCase())){
         return val;
       }
     }).slice(0, 10).map((val,key) => {
        return <div>
          <ul className="list-group">
            <div onClick={() => onClick(val.ticker_id)} style={{cursor:"pointer"}}>
              {val.ticker_id}
            </div>
          </ul>
        </div>
     })
     }
     </Card>
     </div>
      <form className="create-note" style={{paddingTop:"65px"}}>
        <div className="row" style={{padding:"0px 5px"}}>
      {company.map((company,index) => { 
        return (
          <div style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>{company}  <span onClick={() => deleteNote(index)}><i class="fa fa-times" aria-hidden="true"></i></span></div>
        )})}
        </div>
          <div className="input-group" style={{paddingTop:"2px"}}>
          
          <input
            name="title"
            onChange={handleChange}
            autoComplete="off"
            value={note.title}
            placeholder="Title"
          />
          </div>

        <textarea
          name="content"
          onChange={handleChange}
          autoComplete="off"
          value={note.content}
          placeholder="Take a note..."
          rows= "3"
        />
          <Fab onClick={submitNote} data-dismiss="modal">
            <AddIcon />
          </Fab>
          
      </form>
    </div>
  );
}

export default CreateArea;
