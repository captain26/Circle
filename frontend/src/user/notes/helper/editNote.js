import { API } from "../../../backend";

export const editNote = (token, slug, title, content, companies) => {
    console.log(companies);
    return fetch(
        `${API}/api/notes/`,
        {
            method:"PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({slug: slug, title: title,content: content, tag: companies})
        }
    ).then((response) => {
        return response;
    }).catch((err) => console.log(err));
}