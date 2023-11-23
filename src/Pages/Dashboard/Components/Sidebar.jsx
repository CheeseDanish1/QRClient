import React from "react";
import SidebarTop from "./SidebarTop";
import SidebarBottom from "./SidebarBottom";
// TODO: Analytic page with table of data and export option

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div style={{ padding: 30 }}>
        <div style={{ height: 30, fontFamily: "Verdana  " }} className="head">
          <h2 style={{ color: "#030301" }}>GiveAway</h2>
        </div>

        <SidebarTop />
        <SidebarBottom />
      </div>
    </div>
  );
}

export default Sidebar;
