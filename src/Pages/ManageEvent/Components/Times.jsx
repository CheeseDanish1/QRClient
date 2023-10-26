import React from "react";
import Switch from "@mui/material/Switch";

function Times({
  startTime,
  endTime,
  maxCapacity,
  maxCapacityEnabled,
  setStartTime,
  setEndTime,
  setMaxCapacity,
  setMaxCapacityEnabled,
}) {
  function formatDateToISOString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  function toggleStartTime(event) {
    if (event.target.checked) setStartTime(formatDateToISOString(new Date()));
    else setStartTime(null);
  }

  function updateStartTime(event) {
    setStartTime(event.target.value);
  }

  function toggleEndTime(event) {
    if (event.target.checked) setEndTime(formatDateToISOString(new Date()));
    else setEndTime(null);
  }

  function updateEndTime(event) {
    setEndTime(event.target.value);
  }

  function toggleMaxCapacity(event) {
    setMaxCapacityEnabled(event.target.checked);
  }

  function updateMaxCapacity(event) {
    setMaxCapacity(removeNonNumericCharacters(event.target.value));
  }

  function removeNonNumericCharacters(inputString) {
    return inputString.replace(/[^0-9]/g, "");
  }

  return (
    <div className="item eight">
      <div className="inner">
        <div
          className="start-time"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3>Start Time</h3>
          <Switch onChange={toggleStartTime} checked={!!startTime} />
        </div>
        <input
          onChange={updateStartTime}
          value={!!startTime ? startTime : "00"}
          disabled={!startTime}
          className="time"
          type="datetime-local"
          id="startTime"
        />
        <div
          className="end-time"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3>End Time</h3>
          <Switch onChange={toggleEndTime} checked={!!endTime} />
        </div>
        <input
          onChange={updateEndTime}
          value={!!endTime ? endTime : "00"}
          disabled={!endTime}
          className="time"
          type="datetime-local"
          id="startTime"
        />

        <div
          className="maximum-capacity"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3>Maximum Capacity</h3>
          <Switch onChange={toggleMaxCapacity} checked={!!maxCapacityEnabled} />
        </div>
        <input
          onChange={updateMaxCapacity}
          value={maxCapacity}
          disabled={!maxCapacityEnabled}
          className="max-cap-input"
          // type="number"
        />
      </div>
    </div>
  );
}

export default Times;
