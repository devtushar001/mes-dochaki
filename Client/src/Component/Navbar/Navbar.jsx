import React, { useState } from "react";
import "./Navbar.css";
// import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { assets } from "../../Assets/Assets";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={assets.dochaki_logo} alt="" />
        </div>
        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <Link onClick={() => setMenuOpen(!menuOpen)} className="no-style" to='/'><li>Home</li></Link>
            <Link onClick={() => setMenuOpen(!menuOpen)} className="no-style" to='/dashboard'><li>Dashboard</li></Link>
            <Link onClick={() => setMenuOpen(!menuOpen)} className="no-style" to='/stock-material'><li>Stock item</li></Link>
            <Link onClick={() => setMenuOpen(!menuOpen)} className="no-style" to='/raw-material'><li>Raw item</li></Link>
            <Link onClick={() => setMenuOpen(!menuOpen)} className="no-style" to='/stock-material-update'><li>Stock update</li></Link>
            <Link onClick={() => setMenuOpen(!menuOpen)} className="no-style" to='/raw-material-update'><li>Raw update</li></Link>
          </ul>
        </div>
        <button className="menu_icon" onClick={() => setMenuOpen(!menuOpen)} >Open</button>
      </nav>
    </>
  );
};

export default Navbar;
