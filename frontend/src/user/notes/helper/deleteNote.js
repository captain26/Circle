import { API } from "../../../backend";

export const deleteNote = (token,slug) => {
    return fetch(
        `${API}/api/notes/`,
        {
            method:"DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({slug : `${slug}`})
        }
    ).then((res) => {
        return res;
    }).catch((err) => console.log(err));

}