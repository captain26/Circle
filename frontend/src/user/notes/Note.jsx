import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Modal from 'react-bootstrap/Modal';
import Fab from "@material-ui/core/Fab";  
import { editNote } from "./helper/editNote";
import { deleteNote } from "./helper/deleteNote";
import { API } from "../../backend";
import {Card} from "../../core/Card";



function Note(props) {
  var  {title, content,token,slug} = props;
  const [value, setValue] = useState("");
  const [ticker, setTickers] = useState([]);
  const [reload ,setReload] = useState(false);
  const [companies ,setCompanies] = useState([]);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => {
    setReload(!reload);
    setShowEdit(true);
  }

  function handleChange(event) {
    const { name, value} = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value 
      };
    });
  }

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

  function deleteCompany(id) {
    setCompanies(company => {
      return company.filter((companyname, index) => {
        return index !== id;
      });
    });
  }

  function handleEdit() {
    handleEditClose();
    editNote(token,slug,note.title,note.content, companies)
    .then((data) => {
      props.setReload(!props.reload);
      setReload(reload);
    })
  }

  function handleDelete() {
    deleteNote(token,slug)
    .then((data) => {
      props.setReload(!props.reload);
      setReload(reload);
    })
  }

  function ViewNote() {
    return (
        <Modal show={show} onHide={handleClose}>
          <center>
    <div className="viewnote">
    <div className="row" style={{padding:"0px 10px"}}>
      {props.tags.map((company,index) => { 
        return (
          <div style={{fontSize:"10pt", backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>{company}</div>
        )})}
        </div>
      <h1>{props.title}</h1>
      <p style={{whiteSpace: "pre-wrap"}}>{props.content}</p>
    </div>
    </center>
        </Modal>
    );
  }

  const onClick = (companyname) => {
    setCompanies(company => [...company, companyname]);
    setValue("");
  }

  function EditNote() {
    return (
        <Modal show={showEdit} onHide={handleEditClose}>
          <div style={{position:"absolute", zIndex:"1", width:"80%", marginLeft:"50px", marginTop:"40px"}}>
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
        <form className="edit-note" style={{margin:"30px", paddingTop:"60px"}}>
        <div className="row" style={{padding:"0px 5px"}}>
      {companies.map((company,index) => { 
        return (
          <div style={{backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>{company}  <span onClick={() => deleteCompany(index)}><i class="fa fa-times" aria-hidden="true"></i></span></div>
        )})}
        </div>
        <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          autoComplete="off"
          />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          rows= "3"
          autoComplete="off"
          placeholder="Take a note..."
        />
          <Fab onClick={handleEdit}>
            <EditIcon />
          </Fab>
      </form>
        </Modal>
    );
  }

  useEffect(() => {
    setNote({
      title: title,
      content: content
    });
    setCompanies(props.tags);
    getData();
}, [reload])


// companies.map((tag, index) => {
//   return (<Link to={"/company_page/" + tag}><span style={{fontSize:"10pt", backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>#{tag}</span></Link>);
// })
  return (
    <center>
      <div className="note">
        <div  onClick={handleShow}>
          <div style={{marginBottom:"5px", wordBreak: "break-word"}}>
          {props.company === "All" ? 
              
              <div className="row" style={{padding:"0px 10px"}}>
      {props.tags.slice(0, 2).map((company,index) => { 
        return (
          <div style={{fontSize:"10pt", backgroundColor:"#4d52b5", color:"white", borderRadius:"15px", padding:"3px 10px", margin:"3px"}}>{company}</div>
        )})}
        {/* {companies.length > 2 ? <h1 style={{padding:"3px 0px", margin:"3px 0px"}}>....</h1> : null} */}
        </div>
          : null}
          </div>
          <h1>{props.title.length > 19 ? props.title.substring(0, 19) + "..." : props.title}</h1>
      <p style={{whiteSpace: "pre-wrap"}}>{props.content.length > 50 ? props.content.substring(0, 50) + "..." : props.content}</p>
      </div>
      <button onClick={handleDelete} className="delete">
        <DeleteIcon />
      </button>
      <button className="edit" onClick={handleEditShow}>
      <EditIcon/>
      </button>
    </div>
    {ViewNote()}
    {EditNote()}
  </center>
  );
}

export default Note;
