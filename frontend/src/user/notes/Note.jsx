import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <center>
      <Popup trigger={    <div className="note">
      <h1>{props.title.substring(0, 19) + "..."}</h1>
      <p>{props.content.substring(0, 60) + "..."}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>} position="right center" modal>
      <center>
    <div className="viewnote">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
    </center>
  </Popup>
  </center>
  );
}

export default Note;
