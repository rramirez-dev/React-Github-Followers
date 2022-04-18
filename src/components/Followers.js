import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFollowersSearch from "../hooks/useFollowersSearch";
import UserDetails from "./UserDetails";
import "../assets/css/followers-grid.css";

export default function Followers() {
  // const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(location.state.query ?? "");
  const [page, setPage] = useState(1);
  const { followers, hasMore, loading, error } = useFollowersSearch(
    query,
    page
  );

  // Ref is a value that presist after each render: user to refernce elements, document API
  const observer = useRef();

  const lastFollowerRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleFollowerSelection = (follower) => {
    let username = follower.login;

    fetch(`https://api.github.com/users/${username}`).then((res) => {
      res.json().then((data) => {
        setShowUserDetails(true);
        setUserInfo(data);
      });
    });
  };

  if (query == undefined) {
    return (
      <div>
        <Link to="/">Back</Link>
        <h4>No Data</h4>
      </div>
    );
  } else {
    return (
      <div>
        <center>
          <Link to="/">Back</Link>
          &nbsp; Followers for <strong>{query}</strong>
        </center>
        <div
          className="followers-grid-container"
          onClick={() => setShowUserDetails(false)}
        >
          {followers.map((follower) => {
            return (
              <figure
                ref={lastFollowerRef}
                key={follower["id"]}
                className="follower-grid-item"
                onClick={(e) => handleFollowerSelection(follower)}
              >
                <img
                  src={follower["avatar_url"]}
                  alt={follower["login"]}
                  className="follower-grid-img"
                />
                <figcaption>{follower["login"]}</figcaption>
              </figure>
            );
          })}
        </div>
        <div>
          {showUserDetails && (
            <UserDetails
              setShowUserDetails={setShowUserDetails}
              userInfo={userInfo}
            />
          )}
        </div>
      </div>
    );
  }
}
