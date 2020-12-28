

export const addComment = (comment,title) => {
    console.log(comment);
    console.log(title);
    return fetch(`http://127.0.0.1:8000/busybeaver/api/comments/${title}/`, {
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
  

  // export const getComment = (titles) => {
  //     return ( fetch('http://127.0.0.1:8000/busybeaver/api/comments/${title}/'
  //     ,{method:"GET"})
  //     .then(function(response){
  //       return response.json();
  //     })
  //       .then(function(json) {
  //       console.log(json);
  //       setData(json);
  //     })
  //     );
  // }
