import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Followers from "./components/Followers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="followers" element={<Followers />} />
      </Routes>
    </BrowserRouter>
  );
}
