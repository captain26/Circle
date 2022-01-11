import { API } from "../../../backend";


export const getNote = (token) => {
    return (fetch(
        `${API}/api/notes/`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
    ).then(function (response) {
        return response.json();
    }).catch((err) => console.log("error occured"))
    );
}

export const getCompanyNote = (token,company) => {
    return (fetch(
        `${API}/api/notes/${company}/`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
    ).then(function (response) {
        return response.json();
    }).catch((err) => console.log("error occured"))
    );
}

export const companyNote = (token) => {
    return (fetch(
        `${API}/api/companies_notes/`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            }
        }
    ).then(function (response) {
        return response.json();
    }).catch((err) => console.log("error occured"))
    );
}
