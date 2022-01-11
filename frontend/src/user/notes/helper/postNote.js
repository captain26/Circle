import { API } from "../../../backend"


export const postNote = (token, title, content, company) => {
    console.log(company);
    return fetch(`${API}/api/notes/`,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({title: title, content: content,tag: company})
        }).then((response) => { 
            return response;
        }).catch((err) => console.log(err));
}