import React from "react";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "../../../hooks/useSpinner";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandedSidebar from "./ExpandedSidebar";

function SidebarTop() {
  const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSpinner();

  return (
    <div className="sidebar-body">
      <div className="sidebar-element" onClick={() => navigate("/")}>
        <HomeIcon style={{ marginRight: 15 }} />
        <p>Home</p>
      </div>
      <div className="sidebar-element" onClick={() => navigate("/dashboard")}>
        <EventNoteIcon style={{ marginRight: 15 }} />
        <p>Active Events</p>
      </div>
      <div className="sidebar-element" onClick={() => navigate("/archive")}>
        <InventoryIcon style={{ marginRight: 15 }} />
        <p>Archive</p>
      </div>
      <div
        className="sidebar-element analytic"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <p>
          <TrendingUpIcon style={{ marginRight: 15 }} />
          Analytics
        </p>
        {sidebarOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </div>
      <div
        style={{
          marginLeft: 20,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: `${
            window.innerHeight - 128 - 44 * 4 - 29 - 29 - 30 - 30
          }px`,
        }}
      >
        <div style={{ display: sidebarOpen ? "" : "none" }}>
          <ExpandedSidebar />
        </div>
      </div>
    </div>
  );
}

export default SidebarTop;
