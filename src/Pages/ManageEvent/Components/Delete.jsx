import React from "react";
import { useAuth } from "../../../utils/useAuth";
import { deleteEvent } from "../../../utils/api";

function Delete({ event, setCreatingEvent, setManagingEvent }) {

  const { removeUserEvent, user } = useAuth();

  function removeEvent() {
    deleteEvent({ eventUUID: event.uuid }).then((res) => {
      if (!res.error) {
        removeUserEvent(event.uuid);
        if (user.events.length == 1) {
          setCreatingEvent(true);
          setManagingEvent(null);
        } else {
          setManagingEvent(user.events[user.events.length - 2].uuid);
          document.querySelector(".content-container").scrollTo(0, 0);
        }
      }
    });
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
