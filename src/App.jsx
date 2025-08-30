import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "./component/Hero";
import About from "./component/About";
import Service from "./component/Service";
import Contact from "./component/Contact";

const App = () => {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
