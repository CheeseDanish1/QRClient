import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { deleteEvent } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

function Delete({ event, setError }) {
  const { removeUserEvent } = useAuth();
  const navigate = useNavigate();

  function removeEvent() {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent({ eventUUID: event.uuid }).then((res) => {
        if (res.data.error) return setError(res.data.message);

        removeUserEvent(event.uuid);
        navigate("/dashboard");
      });
    }
  }

  return (
    <div className="item ten">
      <div className="inner">
        <h3 style={{ fontWeight: "bold" }}>Delete Event (Permanent)</h3>
        <button onClick={removeEvent} className="button-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Delete;
