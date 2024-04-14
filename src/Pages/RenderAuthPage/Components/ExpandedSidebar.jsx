import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ExpandedSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <ul style={{ listStyleType: "circle" }}>
      {user.events
        .filter((event) => event.archived === false)
        .map((event, i) => {
          return (
            <li
              key={i}
              onClick={() => navigate(`/analytics/${event.uuid}`)}
              className="sidebar-element"
            >
              <div className="bullet-point" />
              <span style={{ marginLeft: "10px" }}>{event.companyName}</span>
            </li>
          );
        })}
    </ul>
  );
}

export default ExpandedSidebar;
