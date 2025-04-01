import React, { useState } from "react";
import './Sidebar.css';
import { Link } from "react-router-dom";
const Sidebar = () => {
    const [sidebar, setSidebar] = useState("dashboard")
    return (
        <>
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <Link className="not-style" to="/dashboard"> <li id={sidebar === "dashboard" ? "isActive" : ""} onClick={() => setSidebar("dashboard")} className="sidebar-menu-list">Dashboard</li></Link>
                    <Link className="not-style" to="/raw-material"> <li id={sidebar === "raw-item" ? "isActive" : ""} onClick={() => setSidebar("raw-item")} className="sidebar-menu-list">Raw Item</li></Link>
                    <Link className="not-style" to="/raw-material-update"> <li id={sidebar === "raw-update-list" ? "isActive" : ""} onClick={() => setSidebar("raw-update-list")} className="sidebar-menu-list">Raw Update List</li></Link>
                    <Link className="not-style" to="/stock-material"> <li id={sidebar === "stock-item" ? "isActive" : ""} onClick={() => setSidebar("stock-item")} className="sidebar-menu-list">Stock Item</li> </Link>
                    <Link className="not-style" to="/stock-material-update"> <li id={sidebar === "stock-update-list" ? "isActive" : ""} onClick={() => setSidebar("stock-update-list")} className="sidebar-menu-list">Stock Update List</li> </Link>
                </ul>
            </div>
        </>
    )
}
export default Sidebar;