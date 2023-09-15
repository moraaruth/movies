import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
