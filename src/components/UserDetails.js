import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import "../assets/css/user-details.css";
import "../assets/css/modal.css";
import folderIcon from "../assets/images/folder.png";
import menuIcon from "../assets/images/menu.png";
import heartIcon from "../assets/images/heart.png";
import peopleIcon from "../assets/images/people.png";
import locationPin from "../assets/images/icons8-pin-64.png";

export default function UserDetails(props) {
  const showGithubProfile = () => {
    console.log("Load Github Profile");
  };

  return (
    <div className="modal">
      <div className="modal-content scrollbar-hidden">
        <div className="header">
          <div
            className="done-btn"
            onClick={() => props.setShowUserDetails(false)}
          >
            Done
          </div>
        </div>
        <div className="user-details-header-row">
          <div className="user-avitar-col">
            <img
              className="avitar"
              src={props.userInfo["avatar_url"]}
              alt={props.userInfo["login"]}
              width="80"
              height="80"
            />
          </div>
          <div className="user-info-col">
            <p className="login">{props.userInfo.login}</p>
            <p className="user-info">{props.userInfo.name}</p>
            <p className="user-info">
              <img
                src={locationPin}
                height="15"
                width="15"
                className="location-icon"
              />
              {props.userInfo.location}
            </p>
          </div>
        </div>
        <p id="bio" className="user-info">
          {props.userInfo.bio}
        </p>
        <div className="user-stats">
          <div className="github-stats">
            <div className="github-stat-items">
              <div className="stat-item-header">
                <img
                  src={folderIcon}
                  height="15"
                  width="15"
                  alt="folder icon"
                />
                <div>Public Repos</div>
              </div>
              <div>{props.userInfo.public_repos}</div>
            </div>
            <div className="github-stat-items">
              <div className="stat-item-header">
                <img src={menuIcon} height="15" width="15" alt="glist icon" />
                <div>Public Gist</div>
              </div>
              <div>{props.userInfo.public_gists}</div>
            </div>
          </div>
          <button
            className="stats-btn github-profile-btn"
            onClick={showGithubProfile}
          >
            Github Profile
          </button>
        </div>
        <div className="user-stats">
          <div className="github-stats">
            <div className="github-stat-items">
              <div className="stat-item-header">
                <img src={heartIcon} height="15" width="15" alt="glist icon" />
                <div>Following</div>
              </div>
              <div>{props.userInfo.following}</div>
            </div>
            <div className="github-stat-items">
              <div className="stat-item-header">
                <img src={peopleIcon} height="16" width="16" alt="glist icon" />
                <div>Followers</div>
              </div>
              <div>{props.userInfo.followers}</div>
            </div>
          </div>
          <button className="stats-btn github-followers-btn">
            Github Followers
          </button>
        </div>
        <footer id="github-footer">
          <p id="join-date">
            Github user since{" "}
            {new Date(props.userInfo.created_at).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
            })}
          </p>
          <a
            href="https://www.flaticon.com/free-icons/folder"
            title="folder icons"
          >
            Folder icons created by Freepik - Flaticon
          </a>
          <br />
          <a href="https://www.flaticon.com/free-icons/list" title="list icons">
            List icons created by Ilham Fitrotul Hayat - Flaticon
          </a>
          <br />
          <a
            href="https://www.flaticon.com/free-icons/heart"
            title="heart icons"
          >
            Heart icons created by Freepik - Flaticon
          </a>
          <br />
          <a
            href="https://www.flaticon.com/free-icons/people"
            title="people icons"
          >
            People icons created by SBTS2018 - Flaticon
          </a>
          <a target="_blank" href="https://icons8.com/icon/uNPauWRhHs2z/pin">
            Pin
          </a>{" "}
          icon by{" "}
          <a target="_blank" href="https://icons8.com">
            Icons8
          </a>
        </footer>
      </div>
    </div>
  );
}
