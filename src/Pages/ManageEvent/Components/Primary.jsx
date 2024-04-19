import React from "react";

function Primary({
  title,
  landingText,
  checkboxes,
  furtherContact,
  setTitle,
  setCheckboxes,
  setLandingText,
  setFurtherContact,
}) {
  function updateTitle(event) {
    setTitle(event.target.value);
  }

  function updateLandingText(event) {
    setLandingText(event.target.value);
  }

  function updateCheckboxes(event) {
    setCheckboxes((prev) => ({
      ...prev,
      [event.target.id]: event.target.checked,
    }));
  }

  function updateContact(event) {
    setFurtherContact(event.target.value);
  }

  return (
    <div className="item one">
      <div className="inner">
        <h3 style={{ marginTop: 10 }}>Giveaway Name & Information</h3>
        <div className="title" style={{ marginTop: 30 }}>
          <p style={{ fontWeight: "bold" }}>Giveaway Title</p>
          <input
            onChange={updateTitle}
            value={title}
            style={{ marginTop: 10 }}
            id="title"
            className="input-field"
            placeholder="Enter giveaway name"
          />
        </div>
        {/* <div className="description" style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold" }}>Giveaway Description</p>
          <input
            style={{ marginTop: 10 }}
            id="description"
            className="input-field"
            placeholder="Add a description"
          />
        </div> */}
        <div className="landing-text" style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold" }}>Giveaway Landing Text</p>
          <input
            onChange={updateLandingText}
            value={landingText}
            style={{ marginTop: 10 }}
            id="landing-text"
            className="input-field"
            placeholder="Add a description"
          />
        </div>
        <div className="features" style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold" }}>Default Fields</p>
          <div className="feature-container">
            <div className="feature feature-one">
              <input
                id="name"
                onChange={updateCheckboxes}
                checked={checkboxes.name}
                type="checkbox"
              />
              <p style={{ marginLeft: 10 }}>Full Name</p>
            </div>
            <div className="feature feature-two">
              <input
                id="email"
                onChange={updateCheckboxes}
                checked={checkboxes.email}
                type="checkbox"
              />
              <p style={{ marginLeft: 10 }}>Email Address</p>
            </div>
            <div className="feature feature-one">
              <input
                id="phone"
                onChange={updateCheckboxes}
                checked={checkboxes.phone}
                type="checkbox"
              />
              <p style={{ marginLeft: 10 }}>Phone Number</p>
            </div>
            <div className="feature feature-one">
              <input
                id="age"
                onChange={updateCheckboxes}
                checked={checkboxes.age}
                type="checkbox"
              />
              <p style={{ marginLeft: 10 }}>Birthday</p>
            </div>
          </div>
        </div>
        <div className="add-consent" style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold" }}>User Advertising Consent</p>
          <select
            value={furtherContact}
            style={{ marginTop: 10 }}
            className="consent-select"
            name="furtherContact"
            onChange={updateContact}
          >
            <option value="None">None</option>
            <option value="Required">Required</option>
            <option value="Optional">Optional</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Primary;
