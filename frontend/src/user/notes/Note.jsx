import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function Example() {
  
    return (
      <>

        <Modal show={show} onHide={handleClose}>
          <center>
    <div className="viewnote">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
    </center>
        </Modal>
      </>
    );
  }

  return (
    <center>
      <div className="note" onClick={handleShow}>
      <h1>{props.title.length > 19 ? props.title.substring(0, 19) + "..." : props.title}</h1>
      <p>{props.content.length > 50 ? props.content.substring(0, 50) + "..." : props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
    {Example()}

  </center>
  );
}

export default Note;
