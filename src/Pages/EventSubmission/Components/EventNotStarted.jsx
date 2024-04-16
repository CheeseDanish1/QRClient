import React from "react";
import Countdown from "react-countdown";

function EventNotStarted({ startDate }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "90%" }}>
        <h1 style={{ color: "red", textAlign: "center", fontFamily: "Roboto" }}>
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

export default EventNotStarted;
