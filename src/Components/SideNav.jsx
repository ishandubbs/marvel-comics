import React from "react";
import getHandbook from "./MarvelHandbooks";

const SideNav = ({ handleViewChange }) => {
    return (
        <div className="sidenav">
            <h2>Marvel Navigation</h2>
            <button onClick={() => handleViewChange("dashboard")}>Comics Dashboard</button>
            <button onClick={() => handleViewChange("handbooks")}>Handbooks</button>
        </div>
    )
}

export default SideNav;
