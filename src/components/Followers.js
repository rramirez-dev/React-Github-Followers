import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFollowersSearch from "../hooks/useFollowersSearch";
import UserDetails from "./UserDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import "../assets/css/followers-grid.css";

export default function Followers() {
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
        <Link to="/">Search</Link>
        <h4>No Data</h4>
      </div>
    );
  } else {
    return (
      <div>
        <div className="followers-header">
          <Link to="/">
            <FontAwesomeIcon icon={solid("chevron-left")} />
            &nbsp; Search
          </Link>
          <div id="query" className="query-item">
            {query}
          </div>
          <div id="add-favorite">
            <FontAwesomeIcon icon={solid("plus")} />
          </div>
        </div>
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
