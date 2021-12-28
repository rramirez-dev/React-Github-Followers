import React, { Component } from "react";
import "../assets/css/follower-search.css";
import GithubLogo from "../assets/images/github-logo.jpg";

export default class Search extends Component {
  render() {
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
        />
        <button className="follower-search-btn">Get Followers</button>
      </div>
    );
  }
}
