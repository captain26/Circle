import {API} from "../../backend";

export const createpost = (title,content,token,company) => {
    return fetch(`${API}/api/createpost/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({"title": title , "content": content ,"sentiment": 2, "tag": company})
    })
      .then(response => {
        return response;
      })
      .catch(err => console.log(err));
  };