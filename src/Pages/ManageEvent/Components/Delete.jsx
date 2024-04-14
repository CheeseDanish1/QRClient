import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { deleteEvent, archiveEvent, unarchiveEvent } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

function Delete({ event, setError }) {
  const { removeUserEvent, updateUserEvent } = useAuth();
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

  function archive() {
    archiveEvent({ eventId: event.uuid }).then((res) => {
      if (res.data.error) return setError(res.data.message);
      if (!res.data.event) return setError("An unexpected error occurred");

      updateUserEvent(res.data.event);
      navigate("/dashboard");
    });
  }

  function unarchived() {
    unarchiveEvent({ eventId: event.uuid }).then((res) => {
      if (res.data.error) return setError(res.data.message);
      if (!res.data.event) return setError("An unexpected error occurred");

      updateUserEvent(res.data.event);
      navigate("/archive");
    });
  }

  return (
    <div className="item ten">
      <div
        className="inner"
        style={{ display: "flex", flexWrap: "nowrap", flexDirection: "column" }}
      >
        <h3 style={{ fontWeight: "bold" }}>
          {event.archived ? "Unarchive" : "Archive"} Event
        </h3>
        <button
          onClick={event.archived ? unarchived : archive}
          className="button-dark"
          style={{ marginTop: "20px" }}
        >
          {event.archived ? "Unarchive" : "Archive"}
        </button>
      </div>
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
