import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/follower-search.css";
import GithubLogo from "../assets/images/github-logo.jpg";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleClick() {
    alert(`Search for followers`);
  }

  function handleChange(e) {
    setSearchQuery(e.target.value);
    e.preventDefault();
  }

  return (
    <div className="follower-search-box">
      <img
        className="logo"
        src={GithubLogo}
        width="100"
        height="100"
        alt="Github Logo"
      />
      <h2>Github Followers</h2>
      <input
        type="text"
        alt="Username Search"
        className="follower-search-field"
        value={searchQuery}
        onChange={handleChange}
      />
      <Link
        className="follower-search-btn"
        to="/followers"
        state={{ query: searchQuery }}
      >
        Get Followers
      </Link>
    </div>
  );
}
