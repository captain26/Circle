
export const createpost = (title) => {
    return fetch(`http://127.0.0.1:8000/busybeaver/api/createpost/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"title": title , "content": "Test Post" ,"sentiment": 2, "tag": ["RELIANCE","3MINDIA", "AUBANK"]})
    })
      .then(response => {
        return response;
      })
      .catch(err => console.log(err));
  };