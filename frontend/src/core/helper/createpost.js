import {API} from "../../backend";

export const createpost = (title,content) => {
    return fetch(`${API}/api/createpost/`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"title": title , "content": content ,"sentiment": 2, "tag": ["RELIANCE","3MINDIA", "AUBANK"]})
    })
      .then(response => {
        return response;
      })
      .catch(err => console.log(err));
  };