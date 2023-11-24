import React, { useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function RenderAuthPage({ children }) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  if (!user) return;

  return (
    <>
      <div className="dashboard">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content-container">
          <div className="content">{children}</div>
        </div>
      </div>
    </>
  );
}

export default RenderAuthPage;
