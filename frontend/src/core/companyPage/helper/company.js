import { API } from "../../../backend";



export const community = (ticker_id) => {
    return fetch(
        `${API}/api/company_holders/?ticker_id=${ticker_id}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        }
    ).then((response) => response.json())
        .catch((err) => console.log(err));
}

export const company_posts = (ticker_id) => {
    return fetch(
        `${API}/api/feed/${ticker_id}/`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        }
    ).then((response) => response.json())
        .catch((err) => console.log(err));
}



export const postWatchlist = (token, arr) => {
    return fetch(`${API}/api/watchlist/`,
    {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
          body: JSON.stringify(arr)
    }).then((response) => {
        return response;
    }).catch((err) => console.log(err))
}

export const removeWatchlist = (token,ticker_id) => {
    return fetch(`${API}/api/watchlist/`,
    {
        method:"DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
          body: JSON.stringify({ticker_id: ticker_id})
    }).then((response) => {
        return response.json();
    }).catch((err) => console.log(err))
}

export const checkWatchlist = (token,ticker_id) => {
    return fetch(`${API}/api/iswatching/`,
    {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
          body: JSON.stringify({ticker_id:ticker_id})
    }).then((response) => response.json())
    .catch((err) => console.log(err))
}

export const getValuations = (token, ticker_id) => {
        return fetch(`${API}/api/valuations/${ticker_id}/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
        }
        ).then((response) => {
            return response.json();
        }).catch((err) => console.log(err))
}

