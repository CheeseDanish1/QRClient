import React from "react";
import { useNavigate } from "react-router-dom";

function Page404() {
  document.title = "Error: 404";

  let navigate = useNavigate();

  // TODO: Unsteal 404 page
  return (
    <div
      style={{
        margin: "0 auto",
        paddingTop: "15%",
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
        Page Not Found
      </h2>
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "12px",
        }}
      >
        The Page you are looking for doesn't exist.<br />
        <button onClick={() => navigate(-1)} className="button-dark">Go Back</button>
      </p>
    </div>
  );
}

export default Page404;
