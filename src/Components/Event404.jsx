import React from "react";
import { Link } from "react-router-dom";

function Event404() {
  return (
    <div
      style={{
        margin: "0 auto",
        marginTop: "15%",
      }}
      className="container"
    >
      <h1
        style={{
          fontSize: "80px",
          fontWeight: "800",
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "25px",
          textAlign: "center",
          marginTop: "-20px",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Event Not Found
      </h2>
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "12px",
        }}
      >
        The Event you are looking for doesn't exist. Go to{" "}
        <Link to={"/"}>Home Page</Link>
      </p>
    </div>
  );
}

export default Event404;
