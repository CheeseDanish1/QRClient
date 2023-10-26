import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useAuth } from "../../../utils/useAuth";

function Sidebar({ setManagingEvent, setCreatingEvent }) {
  const { signout, user } = useAuth();

  return (
    <div className="Sidebar">
      <h2>Manage Events</h2>
      <div className="SidebarListWrapper">
        <ul className="SidebarList">
          {user.events.length === 0 ? (
            <p
              style={{
                marginTop: "10px",
                textAlign: "center",
                color: "#fff2fd",
                fontFamily: "Verdana",
              }}
            >
              No events yet. Try creating one!
            </p>
          ) : (
            user.events.map((val, key) => {
              return (
                <li
                  onClick={() => {
                    setCreatingEvent(false);
                    setManagingEvent(val.uuid);
                  }}
                  className="row"
                  key={key}
                >
                  <div className="icon">
                    <EventNoteIcon />
                  </div>
                  <div className="title">{val.companyName}</div>
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="SidebarBottom">
        <div className="BottomButtons">
          <div className="AddEvent">
            <button
              onClick={() => {
                setManagingEvent(null);
                setCreatingEvent(true);
              }}
              className="modern-button"
            >
              Add Event
            </button>
          </div>
          <div className="Logout">
            <button onClick={() => signout()} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
