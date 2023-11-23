import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandedSidebar from "./ExpandedSidebar";

function SidebarTop() {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);

  return (
    <div className="sidebar-body">
      <div className="sidebar-element" onClick={() => navigate("/")}>
        <HomeIcon style={{ marginRight: 15 }} />
        <p>Home</p>
      </div>
      <div className="sidebar-element" onClick={() => navigate("/dashboard")}>
        <EventNoteIcon style={{ marginRight: 15 }} />
        <p>Manage Giveaways</p>
      </div>
      <div
        className="sidebar-element analytic"
        onClick={() => setExpand((prev) => !prev)}
      >
        <p>
          <TrendingUpIcon style={{ marginRight: 15 }} />
          Analytics
        </p>
        {expand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </div>
      <div style={{ marginLeft: 20 }}>{expand && <ExpandedSidebar />}</div>
    </div>
  );
}

export default SidebarTop;
