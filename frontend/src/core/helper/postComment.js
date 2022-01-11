import {API} from "../../backend";


export const addComment = (comment,title) => {
    const token = JSON.parse(sessionStorage.getItem('user')).token;

    return fetch(`${API}/api/comments/${title}/`, {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({body: comment})
    })
      .then(response => {
        return response;
      })
      .catch(err => console.log(err));
  };