import {API} from "../../backend";


export const addComment = (comment,title) => {
    return fetch(`${API}/api/comments/${title}/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${JSON.parse(localStorage.getItem('user')).token}`,
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
