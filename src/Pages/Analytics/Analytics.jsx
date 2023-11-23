import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubmissions } from "../../utils/api";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import Avatar from "@mui/material/Avatar";
import "./index.css";
import SubmissionTable from "./Components/SubmissionTable";

// TODO: Add export button

function Analytics() {
  document.title = "Analytics";
  const [submissions, setSubmissions] = useState(null);
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    if (!eventId) return;

    getSubmissions({ eventId: eventId }).then((res) => {
      console.log(res.data);
      if (!res.error) {
        setSubmissions(res.data.submissions);
        setEvent(res.data.event);
      }
    });
  }, [eventId]);

  if (!event || !submissions) return <p>Loading</p>;

  return (
    <RenderAuthPage>
      <div className="analytics-header">
        <div className="analytics-image">
          <Avatar
            sx={{
              height: 150,
              width: 150,
              borderRadius: "100%",
            }}
            src={
              !!event.enabled.image
                ? `/api/image/${event.imagePath}`
                : "/images/default-user/jpg"
            }
          />
        </div>
        <div className="info">
          <h3 className="roboto">{event.companyName}</h3>
          <h1 className="roboto">Submission Data</h1>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%" }}>
          <SubmissionTable event={event} submissions={submissions} />
        </div>
      </div>
    </RenderAuthPage>
  );
}

export default Analytics;
