import React, { useState, useEffect } from "react";
import { getEvent, updateEvent } from "../../utils/api";
import {
  Primary,
  QRCode,
  Customization,
  Notifications,
  Times,
  Delete,
} from "./Components";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./index.css";

function ManageEvent({ eventId, setCreatingEvent, setManagingEvent }) {
  const [loading, setLoading] = useState(true);
  // const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [landingText, setLandingText] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    name: false,
    age: false,
    phone: false,
    email: false,
  });
  const [furtherContact, setFurtherContact] = useState("");
  const [emailHTML, setEmailHTML] = useState("");
  const [phoneText, setPhoneText] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [imagePath, setImagePath] = useState("");

  const [imageEnabled, setImageEnabled] = useState(false);
  const [maxCapacityEnabled, setMaxCapacityEnabled] = useState(false);

  const [event, setEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getEvent({ id: eventId }).then((res) => {
      if (res.error) return setError(res.message);

      if (res.event.startTime)
        setStartTime(formatDateToISOString(new Date(res.event.startTime)));
      else setStartTime(null);

      if (res.event.endTime)
        setEndTime(formatDateToISOString(new Date(res.event.endTime)));
      else setEndTime(null);

      setTitle(res.event.companyName);
      setLandingText(res.event.text.eventLandingText);
      setCheckboxes(res.event.fields);
      setFurtherContact(res.event.furtherContact);
      setEmailHTML(res.event.text.emailHTML);
      setPhoneText(res.event.text.phoneText);
      setMaxCapacity(res.event.maxCapacity);
      setColor(res.event.fontColor || "#fff");
      setImagePath(res.event.imagePath);
      setImageEnabled(res.event?.enabled?.image || false);
      setMaxCapacityEnabled(res.event?.enabled?.maxCapacity || false);

      setLoading(false);
      setEvent(res.event);
      setError("");
    });
  }, [eventId]);

  useEffect(() => {
    setLoading(true);
  }, [eventId]);

  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function handleClose(event, reason) {
    if (reason === "clickaway") return;
    setSaving(false);
  }

  function save() {
    if (imageEnabled && !imagePath) return;

    const currentEvent = {
      ...event,
      companyName: title,
      startTime,
      endTime,

      // hasEnded: Boolean
      maxCapacity,
      furtherContact,
      fields: checkboxes,
      text: {
        phoneText,
        emailHTML,
        eventLandingText: landingText,
      },
      fontColor: color,
      imagePath,
      enabled: {
        image: imageEnabled,
        maxCapacity: maxCapacityEnabled,
      },
    };

    updateEvent({ event: currentEvent }).then((res) => {
      if (!res.error) setSaving(true);
    });
  }

  if (!event && loading) return <></>;

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div className="manage-event-container">
        <Primary
          checkboxes={checkboxes}
          furtherContact={furtherContact}
          landingText={landingText}
          title={title}
          setCheckboxes={setCheckboxes}
          setFurtherContact={setFurtherContact}
          setLandingText={setLandingText}
          setTitle={setTitle}
        />
        <QRCode eventUUID={event.uuid} />
        <Customization
          imagePath={imagePath}
          imageEnabled={imageEnabled}
          setImageEnabled={setImageEnabled}
          setImagePath={setImagePath}
          color={color}
          setColor={setColor}
        />
        <div className="item four">
          <div className="inner inner-four">
            {/* Toggle between make public and make private */}
            <button className="button-dark">Publish Giveaway</button>
            <button className="button-dark">Share Analytics</button>
            <button className="button-sleek" onClick={save}>
              Save Changes
            </button>
          </div>
        </div>
        <Notifications
          setEmailHTML={setEmailHTML}
          setPhoneText={setPhoneText}
          emailHTML={emailHTML}
          phoneText={phoneText}
        />
        <div className="item six">
          <div className="inner" style={{ textAlign: "center" }}>
            <h3>Page Preview</h3>
            <button className="button-dark" style={{ marginTop: 25 }}>
              Visit Preview
            </button>
          </div>
        </div>
        <div className="item seven"></div>
        <Times
          endTime={endTime}
          startTime={startTime}
          maxCapacity={maxCapacity}
          maxCapacityEnabled={maxCapacityEnabled}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setMaxCapacity={setMaxCapacity}
          setMaxCapacityEnabled={setMaxCapacityEnabled}
        />
        <Delete
          event={event}
          setCreatingEvent={setCreatingEvent}
          setManagingEvent={setManagingEvent}
        />
      </div>

      <Snackbar open={saving} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Changes saved!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default ManageEvent;
