import { API } from "../../../backend";

export const getOtherUserPost = (token,slug) => {
    return fetch(

        `${API}/api/user_posts/?username=${encodeURIComponent(slug)}`,

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

export const getUserProfile = (token,slug) => {
    return fetch(

        `${API}/api/userprofile/?username=${encodeURIComponent(slug)}`,

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



export const getOtherUserActivity = (token,slug) => {
    return fetch (

        `${API}/api/user_activity/?username=${encodeURIComponent(slug)}`,
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


export const getOtherFollowers = (token,slug) => {
    return fetch (
        `${API}/api/followers/?username=${encodeURIComponent(slug)}`,
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

export const getOtherFollowing = (token,slug) => {
    return fetch (
        `${API}/api/following/?username=${encodeURIComponent(slug)}`,
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
        `${API}/api/follow/`,
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

export const Unfollow = (token,id) => {
    return fetch(
        `${API}/api/unfollow/`,
        {
            method:"DELETE",
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



export const isFollowing = (token,id) => {
    return fetch (
        `${API}/api/isfollowing/`,
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
    });
}

export const getOtherPortfolio = (token,slug) => {
    return fetch (
        `${API}/api/portfolio/?username=${encodeURIComponent(slug)}`,
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




