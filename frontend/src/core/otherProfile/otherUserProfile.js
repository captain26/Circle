import React, { useEffect, useState } from "react";
import { API_IMAGE } from "../../backend.js";
import Base from "../Base.js";
import Watchlist from "../watchlist";
import { OtherActivity } from "./otherUserActivity.js";
import { OtherPortfolio } from "./otherUserPortfolio.js";
import { OtherPosts } from "./otherUserPosts.js";
import {
  getOtherFollowers,
  getOtherFollowing,
  getUserProfile,
  isFollowing,
  follow,
  Unfollow,
} from "./helper/otherProfileApis";
import Explore from "../explore.js";

export const OtherUserProfile = ({ match }) => {
  const slug = match.params.username;
  const [numberFollowers, setNumberFollowers] = useState();
  const [numberFollowing, setNumberFollowing] = useState();

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [checkIsFollowing, setCheckIsFollowing] = useState(false);
  const token = JSON.parse(sessionStorage.getItem("user")).token;
  const [profile, setProfile] = useState({});
  const [reload, setReload] = useState(false);

  //CheckFollow
  const CheckFollowing = () => {
    isFollowing(token, slug).then((data) => {
      setCheckIsFollowing(data);
    });
  };
  //Follow
  const FollowOther = () => {
    follow(token, slug).then((data) => {
      setReload(!reload);
    });
  };
  //UnFollow
  const UnFollowOther = () => {
    Unfollow(token, slug).then((data) => {
      setReload(!reload);
    });
  };

  //Followers
  const Follower = () => {
    getOtherFollowers(token, slug).then((data) => {
      setNumberFollowers(data.length);
      setFollowers(data);
    }).catch(() => setFollowers([]));
  };

  //Following
  const Following = () => {
    getOtherFollowing(token, slug).then((data) => {
      setNumberFollowing(data.length);
      setFollowing(data);
    }).catch(() => setFollowing([]));
  };

  //Get Profile
  const Profile = () => {
    getUserProfile(token, slug).then((data) => {
      setProfile(data);
    });
  };

  useEffect(() => {
    Profile();
    Follower();
    CheckFollowing();
    Following();
  }, [reload]);

  return (
    <div>
      <Base>
      <Explore/>
        <div className="content text-center">
          <div
            className="row  "
            style={{ paddingRight: "10px", paddingLeft: "10px",paddingTop:"70px" }}
          >
            <div className="col-lg-3">
              <img
                className="rounded-circle"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
                src={`${API_IMAGE}` + profile.image}
                alt="profile"
              />
            </div>
            <div
              className="col-lg-9"
              style={{ textAlign: "left", marginTop: "10px" }}
            >
              {checkIsFollowing ? (
                <button
                  onClick={UnFollowOther}
                  type="button"
                  className="btn"
                  style={{
                    color: "white",
                    backgroundColor: "#4d52b5",
                    position: "absolute",
                    right: "70px",
                    top: "20px",
                  }}
                >
                  UnFollow
                </button>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => FollowOther()}
                  style={{
                    color: "white",
                    backgroundColor: "#4d52b5",
                    position: "absolute",
                    right: "70px",
                    top: "20px",
                  }}
                >
                  Follow
                </button>
              )}
              <h3 style={{ fontSize: "20pt" }}>{profile.name}</h3>

              <div className="row" style={{ marginBottom: "5px" }}>
                <div
                  type="button"
                  className="btn"
                  data-toggle="modal"
                  data-target="#followingmodal"
                  className="showFollowLink"
                >
                  <span style={{ fontWeight: "bold" }}>{numberFollowing} </span>
                  Following
                </div>
                <div
                  type="button"
                  className="btn"
                  data-toggle="modal"
                  data-target="#followermodal"
                  className="showFollowLink"
                >
                  <span style={{ fontWeight: "bold" }}>{numberFollowers}</span>{" "}
                  Followers{" "}
                </div>
              </div>

              {/* following modal */}
              <div
                class="modal fade"
                id="followingmodal"
                tabindex="-1"
                role="dialog"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Following
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {following.map((people) => {
                        return (
                          <a href={"/profile/" + people.user.username}>
                            <div style={{ padding: "10px" }}>
                              <div className="row">
                                <img
                                  className="rounded-circle"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "10px",
                                  }}
                                  src={`${API_IMAGE}` + people.image}
                                  alt="profile"
                                />
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  {people.name}
                                </div>
                              </div>
                              <div
                                style={{
                                  color: "grey",
                                  fontSize: "15px",
                                  marginLeft: "25px",
                                }}
                              >
                                {people.user.email}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* follower modal end */}

              {/* following modal */}
              <div
                class="modal fade"
                id="followermodal"
                tabindex="-1"
                role="dialog"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Followers
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {followers.map((people) => {
                        return (
                          <a href={"/profile/" + people.user.username}>
                            <div style={{ padding: "10px" }}>
                              <div className="row">
                                <img
                                  className="rounded-circle"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "10px",
                                  }}
                                  src={`${API_IMAGE}` + people.image}
                                  alt="profile"
                                />
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                  }}
                                >
                                  {people.name}
                                </div>
                              </div>
                              <div
                                style={{
                                  color: "grey",
                                  fontSize: "15px",
                                  marginLeft: "25px",
                                }}
                              >
                                {people.user.email}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* follower modal end */}
              <p>
                <span style={{ fontWeight: "bold" }}>Bio : </span>
                {profile.bio}
              </p>
            </div>
          </div>
          <section>
            <ul
              class="nav nav-tabs"
              id="myTab"
              role="tablist"
              style={{ padding: "0px 30px" }}
            >
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="posts-tab"
                  data-toggle="tab"
                  href="#posts"
                  role="tab"
                  aria-controls="posts"
                  aria-selected="true"
                >
                  Posts
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="portfolio-tab"
                  data-toggle="tab"
                  href="#portfolio"
                  role="tab"
                  aria-controls="portfolio"
                  aria-selected="false"
                >
                  Portfolio
                </a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  id="activity-tab"
                  data-toggle="tab"
                  href="#activity"
                  role="tab"
                  aria-controls="activity"
                  aria-selected="false"
                >
                  Activity
                </a>
              </li>
            </ul>
            <div
              class="tab-content"
              id="myTabContent"
              style={{ padding: "0px 30px" }}
            >
              <div
                class="tab-pane fade active show text-center"
                id="posts"
                role="tabpanel"
                aria-labelledby="posts-tab"
                style={{ marginTop: "20px" }}
              >
                <OtherPosts
                  slug={slug}
                  image={`${API_IMAGE}` + profile.image}
                />
              </div>
              <div
                class="tab-pane fade"
                id="portfolio"
                role="tabpanel"
                aria-labelledby="portfolio-tab"
              >
                <OtherPortfolio slug={slug} />
              </div>
              <div
                class="tab-pane fade"
                id="activity"
                role="tabpanel"
                aria-labelledby="activity-tab"
              >
                <OtherActivity
                  slug={slug}
                  image={`${API_IMAGE}` + profile.image}
                />
              </div>
            </div>
          </section>
        </div>
        <Watchlist />
      </Base>
    </div>
  );
};
