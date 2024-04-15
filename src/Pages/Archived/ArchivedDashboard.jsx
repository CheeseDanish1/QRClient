// Basically the same thing as regular dashboard, except shows archived events only

import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import EventTable from "../Dashboard/Components/EventTable";
import Avatar from "@mui/material/Avatar";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import "../Dashboard/index.css";
import { useNavigate } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URI;

function Dashboard() {
  document.title = "Archived Dashboard — Vending Promotions";

  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  if (!user) return;

  return (
    <RenderAuthPage>
      <div className="dashboard-main header">
        <div className="dashboard-image image">
          {!!user.profileImagePath ? (
            <Avatar
              sx={{ height: 150, width: 150, borderRadius: "100%" }}
              src={`${API_URI}/image/${user.profileImagePath}`}
            >
              <img
                src="/images/default-user.jpg"
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "100%",
                }}
                alt="profile"
              />
            </Avatar>
          ) : (
            <Avatar
              sx={{ height: 150, width: 150, borderRadius: "100%" }}
              src="/images/default-user.jpg"
            />
          )}
        </div>
        <div className="info">
          <h3 style={{ fontFamily: "Roboto" }}>{user.username}</h3>
          <h1 style={{ fontFamily: "Roboto" }}>Archived Events</h1>
        </div>
      </div>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "end",
        }}
      ></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%" }}>
          <EventTable user={user} archived={true} />
        </div>
      </div>
    </RenderAuthPage>
  );
}

export default Dashboard;
