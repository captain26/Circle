import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: "",
    company:""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      company:""
    });
    event.preventDefault();
  }


  return (
    <div>
      <form className="create-note">
          <div>
          <label for="company" style={{marginRight:"10px", fontWeight:"bold"}}>Choose a company:</label> 
          <select id="company" name="company" onChange={handleChange} value={note.company} style={{width:"150px"}}>
            <option value="">Select</option>
            <option value="Reliance">Reliance</option>
            <option value="Tesla">Tesla</option>
            <option value="ACC">ACC</option>
            <option value="WallMart">WallMart</option>
          </select>
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          </div>

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows= "3"
        />
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
      </form>
    </div>
  );
}

export default CreateArea;
