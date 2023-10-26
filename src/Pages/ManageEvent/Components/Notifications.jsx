import React from "react";

function Notifications({ emailHTML, phoneText, setEmailHTML, setPhoneText }) {
  function updateEmailHTML(event) {
    setEmailHTML(event.target.value);
  }

  function updatePhoneText(event) {
    setPhoneText(event.target.value);
  }

  return (
    <div className="item five">
      <div className="inner">
        <h3 style={{ fontWeight: "bold" }}>Notifications</h3>
        <div
          className="email-html-title"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <p style={{ fontWeight: "bold" }}>Email HTML</p>
          <button style={{ marginLeft: 270, marginRight: 20 }}>
            Send Test Email
          </button>
          <button>Revert Original Email</button>
        </div>
        <textarea
          onChange={updateEmailHTML}
          value={emailHTML}
          className="email-html"
          style={{ marginTop: 10 }}
        />
        <div
          className="phone-message-text"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <p style={{ fontWeight: "bold" }}>Phone Message</p>
          <button style={{ marginLeft: 200, marginRight: 20 }}>
            Send Test Message
          </button>
          <button>Revert Original Message</button>
        </div>
        <textarea
          onChange={updatePhoneText}
          value={phoneText}
          className="phone-message"
          style={{ marginTop: 10 }}
        />
      </div>
    </div>
  );
}

export default Notifications;
