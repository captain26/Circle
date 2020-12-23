import React, { useState } from "react";

import { addComment } from "./helper/postComment";

export const CommentField = ({
  title,
  setReload = f => f,
  reload = undefined
}) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (title) => {
    // event.preventDefault();
    addComment(comment, title)
      .then((data) => {
        if (error) {
        } else {
          console.log(data);
          setComment("");
          setReload(!reload);
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
        placeholder="Write a comment...."
      />
      <button
        className="fa fa-paper-plane fa-lg sendicon"

        onClick={() => {
          onSubmit(title);
        }}
      ></button>
    </div>
  );
};
