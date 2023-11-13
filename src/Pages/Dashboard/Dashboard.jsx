import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./index.css";

import EventTable from "./Components/EventTable";
import Avatar from "@mui/material/Avatar";
import CreateEvent from "../CreateEvent/CreateEvent";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";

function Dashboard() {
  document.title = "Event Dashboard";

  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  if (!user) return;

  return (
    <RenderAuthPage>
      <div
        className="header"
        style={{
          padding: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 150,
            width: 150,
            borderRadius: "100%",
            marginRight: 30,
          }}
          className="image"
        >
          <Avatar
            sx={{
              height: 150,
              width: 150,
              borderRadius: "100%",
            }}
            src={
              !!user.profileImagePath
                ? `/api/image/${user.profileImagePath}`
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
