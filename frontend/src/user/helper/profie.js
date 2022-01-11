import { API } from "../../backend";

export const postUserProfileName = (token, name) => {
    return fetch(
        `${API}/api/userprofile/`,
        {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
              body: JSON.stringify({name: name })
        }
    ).then((data) => {
        console.log('user profile created');
    }).catch((err) => console.log(err));
} 

export const getUserPost = (token) => {
    return fetch(
        `${API}/api/user_posts/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data.json();
    }).catch((err) => console.log(err));
}

export const editUserPost = (token, slug, title, content, tag) => {
    return fetch(
        `${API}/api/postdetails/${slug}/`,
        {
            method:"PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
            },
            body: JSON.stringify({title: title, content: content, tag: tag})
        }
    ).then((data) => {
        return data.json();
    }).catch((err) => console.log(err));
}

export const deleteUserPost = (token,slug) => {
    return fetch(
        `${API}/api/postdetails/${slug}/`,
        {
            method:"DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data;
    }).catch((err) => console.log(err));
}

export const editUserProfile = (formdata, token) => {
    return fetch(`${API}/api/userprofile/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`
      },
      body: formdata
    })
      .then(response => {
          return response;  
      })
      .catch(err => console.log(err));
    }


export const getUserProfile = (token) => {
    return fetch(
        `${API}/api/userprofile/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data.json();
    });
}

export const getUserActivity = (token) => {
    return fetch (
        `${API}/api/user_activity/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data.json();
    });
}

export const postUserActivity = (token,slug) => {
    return fetch(
        `${API}/api/user_activity/`,
        {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
            body: JSON.stringify({slug: slug, reaction_type: 0})
        }
    ).then((data) => {
        return data;
    }).catch((err) => console.log(err));
} 

export const deleteUserActivity = (token,slug) => {
    return fetch(
        `${API}/api/user_activity/`,
        {
            method:"DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
            body: JSON.stringify({slug: slug})
        }
    ).then((data) => {
        return data;
    }).catch((err) => console.log(err));
}

export const getFollowers = (token) => {
    return fetch (
        `${API}/api/followers/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data.json();
    });
}

export const getFollowing = (token) => {
    return fetch (
        `${API}/api/following/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data.json();
    });
}


export const follow = (token,id) => {
    return fetch(
        `${API}/api/user_activity/`,
        {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
              body: JSON.stringify({user_id: id})
        }
    ).then((data) => {
        return data.json();
    }).catch((err) => console.log(err));
} 


export const isFollowing = (token) => {
    return fetch (
        `${API}/api/isfollowing/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data.json();
    });
}

export const getPortfolio = (token) => {
    return fetch (
        `${API}/api/portfolio/`,
        {
            method:"GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
        }
    ).then((data) => {
        return data.json();
    });
}

export const postPortfolio = (id, units, price, token) => {
    return fetch(
        `${API}/api/portfolio/`,
        {
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
              body: JSON.stringify([{ticker_id: id, units: units, purchase_price: price}])
        }
    ).then((data) => {
        return data.json();
    }).catch((err) => console.log(err));
}

export const editPortfolio = (id, units, price, token) => {
    return fetch(
        `${API}/api/portfolio/`,
        {
            method:"PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
              body: JSON.stringify({ticker_id: id, units: units, purchase_price: price})
        }
    ).then((data) => {
        return data.json();
    }).catch((err) => console.log(err));
}

export const deletePortfolio = (id, token) => {
    return fetch (
        `${API}/api/portfolio/`,
        {
            method:"DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              },
              body: JSON.stringify({ticker_id: id})
        }
    ).then((data) => {
        return data;
    });
}


export const getWatchlist = (token) => {
    return fetch(`${API}/api/watchlist/`,
    {
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
    }).then((response) => {
        return response.json();
    }).catch((err) => console.log(err))
} 

export const getPrices = (token,tickers) => {
    return fetch(`${API}/api/ltp/`,
    {
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
          body: JSON.stringify(tickers),
    }).then((response) => response.json())
    .catch((err) => console.log(err))
}

export const getTotalData = (token) => {
    return fetch(`${API}/api/value/`,
    {
        method:"GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },
    }).then((response) => response.json())
}