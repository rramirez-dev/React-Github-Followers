import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import "../assets/css/followers-grid.css";

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = location.state ?? "";
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFollowers(query, page);
  }, []);

  const fetchFollowers = (query, page) => {
    fetch(`https://api.github.com/users/${query}/followers?page=${page}`)
      .then((response) => response.json())
      .then((json) => setFollowers(json));
  };

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
