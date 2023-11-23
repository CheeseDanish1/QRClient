import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function SidebarBottom() {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sidebar-bottom">
      <div className="sidebar-element" onClick={() => navigate("/settings")}>
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
  );
}

export default SidebarBottom;
