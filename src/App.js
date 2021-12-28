import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Followers from "./components/Followers";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="followers" element={<Followers />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
