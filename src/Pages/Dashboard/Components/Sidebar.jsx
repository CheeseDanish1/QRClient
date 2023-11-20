import React, {useState} from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Sidebar() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <div style={{ padding: 30 }}>
        <div style={{ height: 30, fontFamily: "Verdana  " }} className="head">
          <h2 style={{ color: "#030301" }}>GiveAway</h2>
        </div>

        <div className="sidebar-body">
          <div className="sidebar-element" onClick={() => navigate("/")}>
            <HomeIcon style={{ marginRight: 15 }} />
            <p>Home</p>
          </div>
          <div
            className="sidebar-element"
            onClick={() => navigate("/transfer")}
          >
            <SendIcon style={{ marginRight: 15 }} />
            <p>Transfer</p>
          </div>
          <div
            className="sidebar-element"
            onClick={() => navigate("/dashboard")}
          >
            <EventNoteIcon style={{ marginRight: 15 }} />
            <p>Manage Giveaways</p>
          </div>
          <div
            className="sidebar-element"
            onClick={() => navigate("/analytics")}
          >
            <TrendingUpIcon style={{ marginRight: 15 }} />
            <p>Analytics</p>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div
            className="sidebar-element"
            onClick={() => navigate("/settings")}
          >
            <PersonIcon style={{ marginRight: 15 }} />
            <p>Account Settings</p>
          </div>
          <div
            className="sidebar-element"
            style={{ marginBottom: 20 }}
            onClick={signout}
          >
            <ExitToAppIcon style={{ marginRight: 15 }} />
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
