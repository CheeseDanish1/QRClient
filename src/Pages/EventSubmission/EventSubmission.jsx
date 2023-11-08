import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { finishSubmission, getEvent, verifyCaptcha } from "../../utils/api";
import ReCaptcha from "react-google-recaptcha";
import Event404 from "../../Components/Event404";
import EventNotStarted from "./Components/EventNotStarted";
import EventEnded from "./Components/EventEnded";
import constants from "../../constants.json";

// Todo: Event Backgrounds

function EventSubmission() {
  document.title = "Submit for Event";
  const APP_URI = constants.PRODUCTION_APP_URI;

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [eventError, setEventError] = useState("");
  const [succussMessage, setSuccussMessage] = useState("");
  const [submissionError, setSubmissionError] = useState("");

  const [promotion, setPromotion] = useState(false);
  const [age, setAge] = useState(new Date().toISOString().slice(0, 10));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const captchaRef = useRef(null);

  let { eventId } = useParams();

  useEffect(() => {
    getEvent({ id: eventId }).then((res) => {
      if (res.error) {
        setEvent(null);
        setEventError(res.message);
        setLoading(false);
        return;
      }

      setEvent(res.event);
      setEventError("");
      setLoading(false);
    });
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccussMessage("");
    setSubmissionError("");

    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    verifyCaptcha({ token }).then((res) => {
      if (!res.succuss || res.error)
        return setSubmissionError("Captcha failed");

      if (event.fields.age && !age)
        return setSubmissionError("Your age is required");

      if (event.fields.name && !name)
        return setSubmissionError("Your name is required");

      if (event.fields.phone && !phone)
        return setSubmissionError("Your phone number is required");

      if (event.fields.email && !email)
        return setSubmissionError("Your email is required");

      if ((event.endTime && event.endTime !== 0) || event.hasEnded) {
        let endDate = new Date(event.endTime);
        if (endDate.getTime() < Date.now())
          setSubmissionError("This event has ended");
      }

      let realAge = new Date(age);
      finishSubmission({
        id: eventId,
        formData: { name, email, phone, age: realAge },
      }).then((res) => {
        if (res.error) {
          return setSubmissionError(res.message);
        }

        setSubmissionError("");
        setSuccussMessage("Check your email or phone for the qr code");
      });
    });
  };

  if (loading) return <p>Loading...</p>;

  if (!event) return <Event404 />;

  if (eventError) return <p>{eventError}</p>;

  if (event.startTime && event.startTime !== 0) {
    let startDate = new Date(event.startTime);
    if (Date.now() < startDate.getTime()) {
      return <EventNotStarted startDate={startDate} />;
    }
  }

  if (event.endTime && event.endTime !== 0) {
    let endDate = new Date(event.endTime);
    if (endDate.getTime() < Date.now()) {
      return <EventEnded />;
    }
  }

  if (event.maxCapacity && event.currentCapacity >= event.maxCapacity) {
    return <h1>This event has already reached maximum capacity</h1>;
  }

  const fields = [
    {
      title: "Full Name",
      type: "text",
      name: "name",
      value: name,
      setValue: setName,
      enabled: event.fields.name,
    },
    {
      title: "Email",
      type: "email",
      name: "email",
      value: email,
      setValue: setEmail,
      enabled: event.fields.email,
    },
    {
      title: "Phone",
      type: "tel",
      name: "phone",
      value: phone,
      setValue: setPhone,
      enabled: event.fields.phone,
    },
    {
      title: "Birthday",
      type: "date",
      name: "phone",
      value: age,
      setValue: setAge,
      enabled: event.fields.age,
    },
  ];

  const style = {
    background: event.enabled.image
      ? `url(${APP_URI}/api/image/${event.imagePath}) no-repeat center center fixed`
      : "",
    backgroundSize: "cover",
  };

  const fontColor = {
    color: event.fontColor || "#333",
  };

  return (
    <div className="authentication-container" style={style}>
      <form onSubmit={handleSubmit} className="authentication-box">
        <h1 className="authentication-heading" style={fontColor}>
          {event.text.eventLandingText}
        </h1>
        {fields.map((field, i) => {
          return field.enabled ? (
            <div className="authentication-input-container">
              <label style={fontColor} className="authentication-label">
                {field.title}
              </label>
              <input
                style={fontColor}
                className="authentication-input-field"
                type={field.type}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
              />
            </div>
          ) : (
            <></>
          );
        })}
        {(event?.furtherContact?.toLowerCase() === "optional" ||
          event?.furtherContact?.toLowerCase() === "required") && (
          <label
            style={{
              fontFamily: "Roboto",
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              gap: 10,
              ...fontColor,
            }}
          >
            <input
              type="checkbox"
              name="promotion"
              value={promotion || ""}
              onChange={(e) => setPromotion(e.target.checked)}
            />
            <span>Receive promotions from {" " + event.companyName}</span>
          </label>
        )}
        <ReCaptcha
          style={{ margin: "20px 0" }}
          ref={captchaRef}
          sitekey="6LcFfeYnAAAAAASJb2KL0XRyWdTWRy_RxeAbgTQV"
        />
        <button type="submit" className="authentication-button">
          Receive Code
        </button>
        {(succussMessage || submissionError) && (
          <div className="messages" style={{ marginTop: 10 }}>
            {succussMessage ? (
              <p style={{ color: "green" }}>{succussMessage}</p>
            ) : (
              <p style={{ color: "red" }}>{submissionError}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default EventSubmission;
