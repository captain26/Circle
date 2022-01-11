import React, { useEffect, useLayoutEffect, useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import './styles.css';
import Base from "../../core/Base"
import { getCompanyNote, getNote, companyNote } from "./helper/getnote";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [company, setCompany] = useState("All");
  const [companies, setCompanies] = useState([]);

  const token = JSON.parse(sessionStorage.getItem('user')).token;
  const [reload ,setReload] = useState(false);


  function handleChange(event) {
    const { name, value } = event.target;
    setCompany(value);
    getNotes(value);
  }
  
  const getNotes = (company) =>{
    if(company === "All"){
      getNote(token)
      .then((data) => {
        setNotes(data);
      }).catch(() => setNotes([]))
    }else if (company !== "All"){
      getCompanyNote(token,company).then((data) => {
      setNotes(data);
    }).catch(() => setNotes([]))
    }
  }

  const getCompanies = () => {
    companyNote(token)
      .then((data) => {
        setCompanies(data);
      }).catch(() => setCompanies([]))
  }

  useEffect(() => {
      getNotes(company);
      getCompanies();
  }, [reload])

  return (<div>
      <Base>
      <div style={{paddingTop:"10px"}} className="contentwithoutwatchlist">
        <h2 className="text-center" style={{paddingTop:"20px"}}>NOTES</h2>
        <a class="nav-link" href="#note" data-toggle="modal" data-target="#addnote"><button type="button" className="btn" style={{color:"white", backgroundColor:"#4d52b5", position:"absolute", right:"10px"}}>+ Add New Note</button></a>
          <select className="placeholder" id="company" name="company"  style={{width:"150px", color:"white", backgroundColor:"#4d52b5", border:"none", padding:"10px", marginLeft:"16px", borderRadius:"5px"}} onChange={handleChange} value={company}>
            <option value="All" selected="selected">All</option>
            {companies.map((companyname, index) => {
        return (
          <option value={companyname.ticker_id}>{companyname.ticker_id}</option>
        );
      })}
          </select>
        {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            setReload = {setReload}  
            reload={reload}
            token = {token}
            slug = {noteItem.slug}
            company = {company}
            tags = {noteItem.tag}
          />
        );  
      })}
     
      <div class="modal fade" id="addnote" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Add a Note</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
      <CreateArea setReload = {setReload}  reload={reload}/>
        </div>
      </div>
    </div>
  </div>

      </div>
      </Base>
      </div>
  );
}

