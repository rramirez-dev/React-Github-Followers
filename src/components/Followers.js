import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/followers-grid.css";

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { query } = location.state ?? "";

  /*  Executed every time the component is rendered
      When ever the values in [] change your hook will run
      Passing an empty array will render onMount.
      On cleanup(unMount) you can remove event listeners.
      Cleanup runs first when your component is mounted
  */
  useEffect(() => {
    fetch(`https://api.github.com/users/${query}/followers?page=1`)
      .then((response) => response.json())
      .then((json) => setFollowers(json));
  }, []);

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
        <div className="followers-grid-container">
          {followers.map((follower) => {
            return (
              <figure key={follower["id"]} className="follower-grid-item">
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
      </div>
    );
  }
}
