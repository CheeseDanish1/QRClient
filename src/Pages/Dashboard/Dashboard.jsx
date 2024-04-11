import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import EventTable from "./Components/EventTable";
import Avatar from "@mui/material/Avatar";
import CreateEvent from "../CreateEvent/CreateEvent";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import "./index.css";
import { useNavigate } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URI;

function Dashboard() {
  document.title = "Event Dashboard";

  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  if (!user) return;

  return (
    <RenderAuthPage>
      <div className="dashboard-main header">
        <div className="dashboard-image image">
          <Avatar
            sx={{
              height: 150,
              width: 150,
              borderRadius: "100%",
            }}
            src={
              !!user.profileImagePath
                ? `${API_URI}/image/${user.profileImagePath}`
                : "/images/default-user/jpg"
            }
          />
        </div>
        <div className="info">
          <h3 style={{ fontFamily: "Roboto" }}>{user.username}</h3>
          <h1 style={{ fontFamily: "Roboto" }}>Shared with me</h1>
        </div>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <button onClick={() => setShowModal(true)} className="button-dark">
          Create New
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%" }}>
          <EventTable user={user} />
        </div>
      </div>
      <CreateEvent handleClose={() => setShowModal(false)} open={showModal} />
    </RenderAuthPage>
  );
}

export default Dashboard;
