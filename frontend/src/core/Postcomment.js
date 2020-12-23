import React, { useState } from "react";

import { addComment } from "./helper/postComment";

export const CommentField = (prop) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (title) => {
    // event.preventDefault();
    console.log(title);
    addComment(comment, title)
      .then((data) => {
        if (error) {
        } else {
          console.log(data);
          setComment("");
        }
        return 0;
      })
      .catch(console.log("Error in signup"));
  };

  const handleChange = (event) => {
    setError("");
    console.log(event.target.value);
    setComment(event.target.value);
  };
  return (
    <div>
      <input
        className="inputfield rounded-pill"
        type="text"
        onChange={handleChange}
        value={comment}
        placeholder="write a comment...."
      />
      <button
        className="fa fa-paper-plane fa-lg sendicon"

        onClick={() => {
          console.log(prop.title);
          onSubmit(prop.title);
        }}
      ></button>
    </div>
  );
};
