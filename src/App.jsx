import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "./component/Hero";
import About from "./component/About";

const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
