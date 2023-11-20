import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "@mui/material/Avatar";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import "./index.css";

function Transfer() {
  document.title = "Event Dashboard";

  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  return (
    <RenderAuthPage>
      <div className="transfer-header">
        <div className="transfer-image">
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
    </RenderAuthPage>
  );
}

export default Transfer;
