import React, { useEffect, useState } from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useAuth } from "../../../hooks/useAuth";
import { sendAnalytics } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// TODO: Break into smaller files
// TODO: Analytic page with table of data and export option

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div style={{ padding: 30 }}>
        <div style={{ height: 30, fontFamily: "Verdana  " }} className="head">
          <h2 style={{ color: "#030301" }}>GiveAway</h2>
        </div>

        <div className="sidebar-body">
          <SidebarElements />
        </div>
        <SidebarBottom />
      </div>
    </div>
  );
}

function SidebarElements() {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);

  return (
    <>
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
      <div style={{ marginLeft: 10 }}>{expand && <ExpandedSidebar />}</div>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AnalyticsModal({ open, handleClose, eventId }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    setError("");
  }, [open]);

  function onSubmit() {
    if (!email) setError("Must include email");

    sendAnalytics({
      eventId,
      email,
    }).then((res) => {
      if (res.data.error) setError(res.data.message);

      setError("");
      handleClose();
    });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Export Analytics
          </Typography>
          <div className="description" style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontFamily: "Roboto" }}>
              Email Address
            </p>
            <input
              id="title"
              className="input-field input-modal"
              placeholder="Add a title"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && (
            <div
              className="error"
              style={{ marginTop: 20, color: "red", fontFamily: "Roboto" }}
            >
              {error}
            </div>
          )}
          <div className="submit" style={{ marginTop: 20 }}>
            <button onClick={onSubmit} className="share-button">
              Send
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function ExpandedSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    open: false,
    id: null,
  });

  return (
    <>
      {user.events.map((event, i) => {
        return (
          <div
            onClick={() => setModal({ open: true, id: event.uuid })}
            className="sidebar-element"
          >
            <RadioButtonUncheckedIcon fontSize="small" />
            <span style={{ marginLeft: "10px" }}>{event.companyName}</span>
          </div>
        );
      })}
      <AnalyticsModal
        handleClose={() => setModal({ open: false, id: null })}
        open={modal.open}
        eventId={modal.id}
      />
    </>
  );
}

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

export default Sidebar;
