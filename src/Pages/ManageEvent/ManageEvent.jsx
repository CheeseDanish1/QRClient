import React, { useState, useEffect } from "react";
import { getEvent, updateEvent } from "../../utils/api";
import {
  Primary,
  QRCode,
  Customization,
  Notifications,
  Times,
  Delete,
  Preview,
} from "./Components";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./index.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";

function ManageEvent() {
  const { eventId } = useParams();

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

  const { updateUserEvent } = useAuth();

  useEffect(() => {
    getEvent({ id: eventId }).then((res) => {
      if (res.error) {
        setLoading(false);
        return setError(res.message);
      }

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

      if (document.querySelector(".content-container"))
        document.querySelector(".content-container").scrollTo(0, 0);
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
    if (imageEnabled && !imagePath)
      return setError("No image. Either disable or upload image");
    if (checkboxes.email + checkboxes.phone === 0)
      return setError("Need Email or Phone checked");

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

    setLoading(true);
    updateEvent({ event: currentEvent }).then((res) => {
      setLoading(false);
      if (res.data.error) return setError(res.data.message);

      updateUserEvent(res.data.event);
      setSaving(true);
    });
  }

  if (!event && loading) return <></>;

  return (
    <RenderAuthPage>
      <div style={{ display: "flex" }}>
        {loading && <LoadingSpinner />}
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
          <Preview event={event} />
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
          <Delete setError={setError} event={event} />
        </div>
        <SuccessSnackbar saving={saving} handleClose={handleClose} />
        <ErrorSnackbar error={error} setError={setError} />
      </div>
    </RenderAuthPage>
  );
}

function LoadingSpinner() {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

function SuccessSnackbar({ saving, handleClose }) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={saving}
      autoHideDuration={3000}
      onClose={handleClose}
    >
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
  );
}

function ErrorSnackbar({ error, setError }) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={!!error}
      autoHideDuration={3000}
      onClose={() => setError(null)}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setError(null)}
        severity="error"
        sx={{ width: "100%" }}
      >
        {error}
      </MuiAlert>
    </Snackbar>
  );
}

export default ManageEvent;
