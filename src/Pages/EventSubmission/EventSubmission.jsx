import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { finishSubmission, getEvent, verifyCaptcha } from "../../utils/api";
import ReCaptcha from "react-google-recaptcha";
import Event404 from "../../Components/Event404";
import EventNotStarted from "./Components/EventNotStarted";
import EventEnded from "./Components/EventEnded";

// Todo: Event Backgrounds
const API_URI = process.env.REACT_APP_API_URI;

function EventSubmission() {
  document.title = "Create Submission — Vending Promotions";

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
  const [bagSize, setBagSize] = useState("s");
  const [backgroundLoading, setBackgroundLoading] = useState(true);

  const captchaRef = useRef(null);

  let { eventId } = useParams();

  useEffect(() => {
    if (!event) return;
    if (!event.enabled.image) return setBackgroundLoading(false);

    const img = new Image();
    let src = `${API_URI}/image/${event.imagePath}`;
    console.log("Image source: ", src);
    img.src = src;
    img.onload = () => {
      setBackgroundLoading(false);
    };
  }, [event]);

  useEffect(() => {
    getEvent({ id: eventId }).then((res) => {
      setLoading(false);

      if (res.error) {
        setEvent(null);
        setEventError(res.message);
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
        formData: {
          promotion,
          name,
          email,
          phone,
          age: realAge,
          custom: [
            {
              title: "Bag Size",
              value: bagSize,
            },
          ],
        },
      }).then((res) => {
        if (res.error) {
          return setSubmissionError(res.message);
        }

        setSubmissionError("");
        // Change the message based off what they need to check
        // If phone is checked, it will always prioritize just phone
        // Otherwise it should be email because one of them is always checked
        setSuccussMessage(
          `Thank you for participating! Please wait for your QR Code via ${
            event.fields.phone ? "text message" : "email"
          }`
        );
      });
    });
  };

  if (loading) return <p>Loading...</p>;

  if (!event) return <Event404 />;

  document.title = `${event.companyName} – Powered by Vending Promotions`;

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

  if (event.archived === true) {
    return <p>This event has been archived</p>;
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
      name: "age",
      value: age,
      setValue: setAge,
      enabled: event.fields.age,
    },
  ];

  const style = {
    background: event.enabled.image
      ? `url(${API_URI}/image/${event.imagePath}) no-repeat center center fixed`
      : "",
    backgroundSize: "cover",
  };

  const fontColor = {
    color: event.fontColor || "#333",
  };

  return (
    <div className="authentication-container" style={style}>
      {!backgroundLoading && (
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
          {/* Definitely remove this */}
          {(event.companyName.toLowerCase() === "doordash" ||
            event.companyName.toLowerCase() === "door dash") && (
            <div className="authentication-input-container">
              <label style={fontColor} className="authentication-label">
                Bag Size
              </label>

              <div>
                <input
                  style={{ marginRight: 10, ...fontColor }}
                  className="checkbox-1"
                  type="checkbox"
                  onChange={() => setBagSize("Small")}
                  checked={bagSize === "Small"}
                />
                <label htmlFor=".checkbox-1">Small</label>
              </div>
              <div style={{ marginTop: 5 }}>
                <input
                  style={{ marginRight: 10, ...fontColor }}
                  className="checkbox-2"
                  type="checkbox"
                  onChange={() => setBagSize("Large")}
                  checked={bagSize === "Large"}
                />
                <label htmlFor=".checkbox-2">Large</label>
              </div>
            </div>
          )}
          <ReCaptcha
            style={{ marginBottom: "20px" }}
            ref={captchaRef}
            sitekey="6LcFfeYnAAAAAASJb2KL0XRyWdTWRy_RxeAbgTQV"
          />
          {(event?.furtherContact?.toLowerCase() === "optional" ||
            event?.furtherContact?.toLowerCase() === "required") && (
            <label
              style={{
                fontFamily: "Roboto",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                marginBottom: "20px",
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
          <button type="submit" className="authentication-button">
            Receive Code
          </button>
          {(succussMessage || submissionError) && (
            <div className="messages" style={{ marginTop: 10 }}>
              {succussMessage ? (
                <p style={{ color: "green", fontFamily: "Roboto" }}>
                  {succussMessage}
                </p>
              ) : (
                <p style={{ color: "red", fontFamily: "Roboto" }}>
                  {submissionError}
                </p>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default EventSubmission;
