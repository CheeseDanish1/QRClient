import React, { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import CreateEvent from "../CreateEvent";
import { useAuth } from "../../utils/useAuth";
import { useNavigate } from "react-router-dom";
import ManageEvent from "../ManageEvent/ManageEvent";
import "./index.css";

function Dashboard() {
  document.title = "Event Dashboard";

  const [creatingEvent, setCreatingEvent] = useState(true);
  const [managingEvent, setManagingEvent] = useState(null);

  const { addUserEvents, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  if (!user) return;

  return (
    <div className="dashboard">
      <div className="sidebar">
        <Sidebar
          setCreatingEvent={setCreatingEvent}
          setManagingEvent={setManagingEvent}
        />
      </div>
      <div className="content-container">
        <div className="content">
          <RenderContent
            addUserEvents={addUserEvents}
            creatingEvent={creatingEvent}
            managingEvent={managingEvent}
            setCreatingEvent={setCreatingEvent}
            setManagingEvent={setManagingEvent}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}

function RenderContent({ creatingEvent, addUserEvents, user, managingEvent, setCreatingEvent, setManagingEvent }) {
  if (!creatingEvent) return <ManageEvent setCreatingEvent={setCreatingEvent} setManagingEvent={setManagingEvent} eventId={managingEvent} />;
  else return <CreateEvent addUserEvents={addUserEvents} userId={user.id} />;
}

export default Dashboard;
