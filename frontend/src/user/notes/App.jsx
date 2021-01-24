import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import './styles.css';
import Base from "../../core/Base"

export default function Notes() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
      <Base>
      <div style={{paddingTop:"10px"}} className="contentwithoutwatchlist">
        <h2 className="text-center">NOTES</h2>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="reliance-tab" data-toggle="tab" href="#reliance" role="tab"><button className="btn" type="button" style={{backgroundColor:"#4d52b5", color:"white", margin:"0px 10px"}}>Reliance</button></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="tesla-tab" data-toggle="tab" href="#tesla" role="tab"><button className="btn" type="button" style={{backgroundColor:"#4d52b5", color:"white", margin:"0px 10px"}}>Tesla</button></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="acc-tab" data-toggle="tab" href="#acc" role="tab"><button className="btn" type="button" style={{backgroundColor:"#4d52b5", color:"white", margin:"0px 10px"}}>ACC</button></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="wallmart-tab" data-toggle="tab" href="#wallmart" role="tab"><button className="btn" type="button" style={{backgroundColor:"#4d52b5", color:"white", margin:"0px 10px"}}>WallMart</button></a>
        </li>
        <a class="nav-link" href="#note" data-toggle="modal" data-target="#addnote"><button type="button" className="btn" style={{color:"white", backgroundColor:"#4d52b5", position:"absolute", right:"10px"}}>+ Add New Note</button></a>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade active show text-center" id="reliance" role="tabpanel" style={{marginBottom:"30px"}}>
        {notes.map((noteItem, index) => {
        return ( (noteItem.company === "Reliance") &&
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            company={noteItem.company}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
        </div>
        <div class="tab-pane fade" id="acc" role="tabpanel" style={{marginBottom:"30px"}}>
        {notes.map((noteItem, index) => {
        return ((noteItem.company === "ACC") &&
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
        </div>
        <div class="tab-pane fade" id="tesla" role="tabpanel" style={{marginBottom:"30px"}}>
        {notes.map((noteItem, index) => {
        return ((noteItem.company === "Tesla") &&
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
        </div>
        <div class="tab-pane fade" id="wallmart" role="tabpanel" style={{marginBottom:"30px"}}>
        {notes.map((noteItem, index) => {
        return ((noteItem.company === "WallMart") &&
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
        </div>
      </div>

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
      <CreateArea onAdd={addNote} />
        </div>
      </div>
    </div>
  </div>

      </div>
      </Base>
  );
}

