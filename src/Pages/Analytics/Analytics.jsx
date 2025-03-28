import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubmissions } from "../../utils/api";
import { useSpinner } from "../../hooks/useSpinner.jsx";
import AnalyticsModal from "../../Components/AnalyticsModal";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import Avatar from "@mui/material/Avatar";
import SubmissionTable from "./Components/SubmissionTable";
import "./index.css";

// TODO: Add success message after import
const API_URI = process.env.REACT_APP_API_URI;

function Analytics() {
  document.title = "Analytics — Vending Promotions";

  const [showModal, setShowModal] = useState(false);
  const [submissions, setSubmissions] = useState(null);
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  const { setLoading } = useSpinner();

  useEffect(() => {
    if (!eventId) return;

    setLoading(true);

    getSubmissions({ eventId: eventId }).then((res) => {
      setLoading(false);
      if (!res.data.error) {
        console.log(res.data.submissions);
        setSubmissions(res.data.submissions);
        setEvent(res.data.event);
      }
    });
  }, [eventId, setLoading]);

  if (!event || !submissions) return <RenderAuthPage></RenderAuthPage>;

  return (
    <RenderAuthPage>
      <div className="analytics-header">
        <div className="analytics-image">
          {!!event.enabled.image ? (
            <Avatar
              sx={{ height: 150, width: 150, borderRadius: "100%" }}
              src={`${API_URI}/image/${event.imagePath}`}
            >
              <img
                style={{
                  height: "150px",
                  widows: "150px",
                  borderRadius: "100%",
                }}
                src="/images/default-user.jpg"
                alt="event background"
              />
            </Avatar>
          ) : (
            <Avatar
              sx={{ height: 150, width: 150, borderRadius: "100%" }}
              src="/images/default-user.jpg"
            />
          )}

          {/* <Avatar
            sx={{
              height: 150,
              width: 150,
              borderRadius: "100%",
            }}
            src={`${API_URI}/image/${event.imagePath}`}
          /> */}
        </div>
        <div className="info">
          <h3 className="roboto">{event.companyName}</h3>
          <h1 className="roboto">Submission Data</h1>
        </div>
      </div>

      {submissions.length > 0 && (
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button onClick={() => setShowModal(true)} className="button-dark">
            Export Data
          </button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%" }}>
          <SubmissionTable event={event} submissions={submissions} />
        </div>
      </div>

      <AnalyticsModal
        eventId={event.uuid}
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
    </RenderAuthPage>
  );
}

export default Analytics;
