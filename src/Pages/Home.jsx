import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      <h1>Links</h1>
      <Link to="/scan">Scan</Link>
      <br />
      <Link to="/event/create">Create Event</Link>
      <br />
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <br />
      <Link to={`/event/${inputValue}`}>Go to event</Link>
      <br />
    </div>
  );
}

export default Home;
