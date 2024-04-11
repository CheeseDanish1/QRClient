import React from "react";

function Preview({ event }) {
  const APP = process.env.REACT_APP_APP_URI;

  // For now just go to page
  function previewPage() {
    window.open(`${APP}/event/${event.uuid}`, "_blank");
  }

  return (
    <div className="item six">
      <div className="inner" style={{ textAlign: "center" }}>
        <h3>Page Preview</h3>
        <button
          onClick={previewPage}
          className="button-dark"
          style={{ marginTop: 25 }}
        >
          Visit Preview
        </button>
      </div>
    </div>
  );
}

export default Preview;
