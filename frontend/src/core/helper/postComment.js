export const addComment = (comment,title) => {
    console.log(comment);
    console.log(title);
    return fetch(`http://127.0.0.1:8000/busybeaver/api/postdetails/${title}/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({body: comment})
    })
      .then(response => {
        return response;
      })
      .catch(err => console.log(err));
  };
  
