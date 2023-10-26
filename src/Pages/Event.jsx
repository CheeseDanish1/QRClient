import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { finishSubmission, getEvent, verifyCaptcha } from "../utils/api";
import ReCaptcha from "react-google-recaptcha";
import Countdown from "react-countdown";
import Event404 from "../Components/Event404";
import constants from "../constants.json";

function Event() {
  const APP_URI = constants.PRODUCTION_API_URI;
  document.title = "Submit for Event";

  const [loadingEvent, setLoadingEvent] = useState(true);
  const [event, setEvent] = useState(null);
  const [eventError, setEventError] = useState("");
  const [succussMessage, setSuccussMessage] = useState("");

  const [formData, setFormData] = useState({
    promotion: false,
    age: new Date().toISOString().slice(0, 10),
    name: "",
    email: "",
    phone: "",
  });

  const [submissionError, setSubmissionError] = useState("");

  const captchaRef = useRef(null);

  let { eventId } = useParams();

  useEffect(() => {
    getEvent({ id: eventId }).then((res) => {
      if (res.error) {
        setEvent(null);
        setEventError(res.message);
        setLoadingEvent(false);
        return;
      }

      setEvent(res.event);
      setEventError("");
      setLoadingEvent(false);
    });
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "promotion") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    verifyCaptcha({ token }).then((res) => {
      if (!res.succuss || res.error)
        return setSubmissionError("Captcha failed");

      setSuccussMessage("");
      setSubmissionError("");

      if (event.fields.age && !formData.age)
        return setSubmissionError("Your age is required");

      if (event.fields.name && !formData.name)
        return setSubmissionError("Your name is required");

      if (event.fields.phone && !formData.phone)
        return setSubmissionError("Your phone number is required");

      if (event.fields.email && !formData.email)
        return setSubmissionError("Your email is required");

      if ((event.endTime && event.endTime !== 0) || event.hasEnded) {
        let endDate = new Date(event.endTime);
        if (endDate.getTime() < Date.now())
          setSubmissionError("This event has ended");
      }

      let age = new Date(formData.age);
      finishSubmission({
        id: eventId,
        formData: { ...formData, age: age },
      }).then((res) => {
        if (res.error) {
          return setSubmissionError(res.message);
        }

        setSubmissionError("");
        setSuccussMessage("Check your email or phone for the qr code");
      });
    });
  };

  if (loadingEvent) return <p>Loading...</p>;

  if (!event) return <Event404 />;

  if (eventError) return <p>{eventError}</p>;

  if (event.startTime && event.startTime !== 0) {
    let startDate = new Date(event.startTime);
    if (Date.now() < startDate.getTime()) {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "90%" }}>
            <h1 style={{ color: "red", textAlign: "center" }}>
              This event hasn't started yet
            </h1>
            <div
              className="countdown"
              style={{ width: "100%", textAlign: "center", fontSize: "24px" }}
            >
              <Countdown
                onComplete={() => window.location.reload()}
                date={startDate}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  if (event.endTime && event.endTime !== 0) {
    let endDate = new Date(event.endTime);
    if (endDate.getTime() < Date.now()) {
      return (
        <h1 style={{ color: "red", textAlign: "center" }}>
          This event has ended
        </h1>
      );
    }
  }

  if (event.maxCapacity && event.currentCapacity >= event.maxCapacity) {
    return <h1>This event has already reached maximum capacity</h1>;
  }

  const style = {
    outerContainer: {
      backgroundImage: event.imagePath
        ? `url(${APP_URI}/api/image/${event.imagePath})`
        : "",
      backgroundColor: event.imagePath ? "" : "#f0f0f0",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    label: {
      color: event.fontColor || "#000000",
    },
    innerContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "10px",
      width: "80%",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "5px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
      marginTop: "20px",
    },
  };

  return (
    <div className="event-container" style={style.outerContainer}>
      <div className="form-container" style={style.innerContainer}>
        <h2 style={{ ...style.label, textAlign: "center" }}>
          {event.text.eventLandingText ||
            `Receive promotion from "${event.companyName}"`}
        </h2>
        <form onSubmit={handleSubmit}>
          {event.fields.name && (
            <label style={style.label}>
              Full Name:
              <input
                required
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                className="input-field"
                style={style.input}
              />
            </label>
          )}
          {event.fields.email && (
            <label style={style.label}>
              Email:
              <input
                required
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                className="input-field"
                style={style.input}
              />
            </label>
          )}
          {event.fields.phone && (
            <label style={style.label}>
              Phone:
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                className="input-field"
                style={style.input}
              />
            </label>
          )}
          {event.fields.age && (
            <label style={style.label}>
              Age:
              <input
                required
                type="date"
                name="age"
                value={formData.age || ""}
                onChange={handleInputChange}
                className="input-field"
                style={{ ...style.input, marginLeft: 10 }}
              />
            </label>
          )}
          <br />
          {(event.furtherContact.toLowerCase() === "optional" ||
            event.furtherContact.toLowerCase() === "required") && (
            <label style={style.label}>
              <input
                type="checkbox"
                name="promotion"
                value={formData.promotion || ""}
                onChange={handleInputChange}
              />
              You agree to sign up for future promotions from
              {" " + event.companyName}
              <br />
            </label>
          )}

          <p style={{ color: "green" }}>{succussMessage}</p>
          <p style={{ color: "red" }}>{submissionError}</p>

          <ReCaptcha
            ref={captchaRef}
            sitekey="6LcFfeYnAAAAAASJb2KL0XRyWdTWRy_RxeAbgTQV"
          />

          <button type="submit" className="submit-button" style={style.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Event;
