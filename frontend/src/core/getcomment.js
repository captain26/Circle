import React, { useState, useEffect, useRef } from "react";
import { Card } from "./Card";
import { API, API_IMAGE } from "../backend";
import { postUserActivity, deleteUserActivity } from "../user/helper/profie.js";
import { addComment } from "./helper/postComment";

export const Comments = (prop) => {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("user")).token;
  const [showResults, setShowResults] = useState(false);
  const [showViewAll, setShowViewAll] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      htmlElRef.current && htmlElRef.current.focus();
    };
    return [htmlElRef, setFocus];
  };

  const [inputRef, setInputFocus] = useFocus();

  const onClick = () => {
    setShowViewAll(false);
    setShowResults(true);
  };

  const postActivity = (slug) => {
    postUserActivity(token, slug).then((data) => {});
    prop.setReload(!prop.reload);
  };

  const deleteActivity = (slug) => {
    deleteUserActivity(token, slug).then((data) => {});
    prop.setReload(!prop.reload);
  };

  //Getting comments
  const getComments = () => {
    fetch(`${API}/api/comments/${prop.slug}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        setComments(json);
      }).catch(() => setComments([]));
  };

  const onSubmit = (slug) => {
    // event.preventDefault();
    addComment(comment, slug)
      .then((data) => {
        if (error) {
        } else {
          setComment("");
          setReload(!reload);
          setShowViewAll(false);
          setShowResults(true);
        }
        return 0;
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    setError("");
    setComment(event.target.value);
  };

  const enter = (event) => {
    if (event.keyCode === 13) {
      onSubmit(prop.slug);
    }
  };

  //Showing All Comments
  const Result = () => {
      return comments.slice(0,-2).map((comment, index) => {
      var time = Math.round(
        (new Date().getTime() - new Date(comment.created_on).getTime()) / 60000
      );
      return (
        <div
          key={index}
          className="row"
          style={{ margin: "auto", padding: "5px 10px" }}
        >
          <div className="col-lg-1 col-md-2 col-sm-2">
          <a href={"/profile/" + encodeURIComponent(comment.author.user.username)} >
            <img
              className="rounded-circle"
              style={{ width: "40px", height: "40px", marginTop: "5px" }}
              src={`${API_IMAGE}` + comment.author.image}
              alt="profile"
            />
            </a>
          </div>
          <div
            className="col-lg-11 col-md-10 col-sm-10"
            style={{ paddingLeft: "5px" }}
          >
            <div
              style={{
                textAlign: "right",
                position: "absolute",
                right: "30px",
              }}
            >
              {time > 60 ? (
                time > 1440 ? (
                  <span
                    style={{
                      fontSize: "8px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    {Math.round(time / 1440)}d
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: "8px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    {Math.round(time / 60)}h
                  </span>
                )
              ) : (
                <span
                  style={{
                    fontSize: "8px",
                    marginBottom: "0px",
                    fontWeight: "600",
                  }}
                >
                  {time}m
                </span>
              )}
            </div>
            <Card class="bg-light text-left p-2 mb-2">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginBottom: "2px",
                }}
              >
              <a href={"/profile/" + encodeURIComponent(comment.author.user.username)} >
                {comment.author.name}
              </a>
              </p>
              <p style={{ fontSize: "12px", marginBottom: "2px" }}>
                {comment.body}
              </p>
            </Card>
          </div>
        </div>
      );
    });
  };
  var likedAlready = false;

  useEffect(() => {
    getComments();
  }, [reload]);
  return (
    <div>
      <hr
        width="90%"
        size="1"
        textAlign="center"
        style={{ margin: "auto", marginBottom: "10px" }}
      />
      <div className="row">
        <div className="col-sm-6">
          {prop.reactions.map((react, index) => {
                          if(react.username === prop.username){
                            likedAlready = true;
                          }
                        })}
          {likedAlready ? (
            <div onClick={() => deleteActivity(prop.slug)}>
              <span
                style={{
                  fontSize: "18px",
                  color: "#24a0ed",
                  cursor: "pointer",
                }}
              >
                <i class="fa fa-thumbs-up"></i> Like
              </span>
            </div>
          ) : (
            <div onClick={() => postActivity(prop.slug)}>
              <span style={{ fontSize: "18px", cursor: "pointer" }}>
                <i class="fa fa-thumbs-up"></i> Like
              </span>
            </div>
          )}
        </div>
        <div className="col-sm-6">
          <div>
            <span
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={setInputFocus}
            >
              <i class="fa fa-comments"></i> Comment
            </span>
          </div>
        </div>
      </div>
      <hr
        width="90%"
        size="1"
        textAlign="center"
        style={{ margin: "10px auto" }}
      />

      {comments.length > 2 ? (
        showViewAll ? (
          <p
            style={{
              alignContent: "left",
              fontSize: "14px",
              color: "#4d52b5",
              fontWeight: "bold",
              textAlign: "left",
              marginLeft: "30px",
              cursor: "pointer",
            }}
            onClick={onClick}
          >
            View All Comments
          </p>
        ) : null
      ) : null}
      {showResults ? <Result /> : null}
      {comments.slice(-2).map((comment, index) => {
        var time = Math.round(
          (new Date().getTime() - new Date(comment.created_on).getTime()) /
            60000
        );
        return (
          <div
            key={index}
            className="row"
            style={{ margin: "auto", padding: "5px 10px" }}
          >
            <div className="col-lg-1 col-md-2 col-sm-2">
          <a href={"/profile/" + encodeURIComponent(comment.author.user.username)} >
              <img
                className="rounded-circle"
                style={{ width: "40px", height: "40px", marginTop: "5px" }}
                src={`${API_IMAGE}` + comment.author.image}
                alt="profile"
              />
              </a>
            </div>
            <div
              className="col-lg-11 col-md-10 col-sm-10"
              style={{ paddingLeft: "5px" }}
            >
              <div
                style={{
                  textAlign: "right",
                  position: "absolute",
                  right: "30px",
                }}
              >
                {time > 60 ? (
                  time > 1440 ? (
                    <span
                      style={{
                        fontSize: "8px",
                        marginBottom: "0px",
                        fontWeight: "600",
                      }}
                    >
                      {Math.round(time / 1440)}d
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "8px",
                        marginBottom: "0px",
                        fontWeight: "600",
                      }}
                    >
                      {Math.round(time / 60)}h
                    </span>
                  )
                ) : (
                  <span
                    style={{
                      fontSize: "8px",
                      marginBottom: "0px",
                      fontWeight: "600",
                    }}
                  >
                    {time}m
                  </span>
                )}
              </div>
              <Card class="bg-light text-left p-2 mb-2">
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginBottom: "2px",
                  }}
                >
                <a href={"/profile/" + encodeURIComponent(comment.author.user.username)} >
                  {comment.author.name}
                </a>
                </p>
                <p style={{ fontSize: "12px", marginBottom: "2px" }}>
                  {comment.body}
                </p>
              </Card>
            </div>
          </div>
        );
      })}

      <div>
        <a href={"/profile"}>
          <img
            className="rounded-circle shape"
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
            src={prop.image}
            alt="profile"
          />
        </a>
        <input
          className="inputfield rounded-pill"
          type="text"
          onChange={handleChange}
          value={comment}
          placeholder="Write a comment...."
          onKeyDown={(e) => enter(e)}
          ref={inputRef}
        />
        <button
          className="fa fa-paper-plane fa-lg sendicon"
          onClick={() => {
            onSubmit(prop.slug);
          }}
        ></button>
      </div>
    </div>
  );
};
