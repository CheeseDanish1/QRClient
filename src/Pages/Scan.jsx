import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import { approveSubmission } from "../utils/api";

const buttonStyles = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
  marginTop: "20px",
  maxWidth: "700px",
};

const successModalStyles = {
  position: "fixed",
  width: "50%",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#dff0d8",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const succussButtonStyles = {
  backgroundColor: "#008000",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
  marginTop: "20px",
};

const errorModalStyles = {
  position: "fixed",
  width: "50%",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8d7da",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  maxWidth: "300px",
  textAlign: "center",
};

const errorButtonStyles = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: "5px",
  padding: "10px 20px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
  marginTop: "20px",
};

const checkmarkStyles = {
  fontSize: "80px",
  color: "green",
  marginBottom: "20px",
};

function Scan() {
  document.title = "Scan";
  const videoRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [results, setResults] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (scanner) {
      scanner.start();

      return () => {
        scanner.stop();
      };
    }
  }, [scanner]);

  useEffect(() => {
    if (results) {
      console.log("Checking");
      setError("");
      approveSubmission({ userId: results })
        .then((res) => {
          if (res.error) {
            console.log("Error: ", res.message);
            setError(res.message);
            setResults("");
            setSuccessMessage("");
            return;
          }

          setError("");
          setSuccessMessage(res.message);
        })
        .catch((error) => {
          console.error(error);
          setError("Error fetching submission");
          setResults("");
        });
    }
  }, [results]);

  function resultsReceived(result) {
    console.log(error, successMessage);
    if (!error && !successMessage) setResults(result.data);
  }

  async function handleStartClick() {
    const video = videoRef.current;
    try {
      const scannerInstance = new QrScanner(video, resultsReceived, {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        preferredCamera: "environment",
        maxScansPerSecond: 1,
      });
      setScanner(scannerInstance);
    } catch (error) {
      console.log(error);
    }
  }

  function handleStopClick() {
    if (scanner) {
      scanner.stop();
      setScanner(null);
      setResults("");
    }
  }

  function closeErrorModal() {
    setError("");
  }

  function closeSuccessModal() {
    setSuccessMessage("");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <div style={{ width: "90%" }}>
        <div
          id="video-container"
          style={{
            width: "100%",
            overflow: "hidden",
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <video
            id="qr-video"
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", maxWidth: "700px" }}
          ></video>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {!!scanner ? (
            <button
              className="stop-scan"
              onClick={handleStopClick}
              style={buttonStyles}
            >
              Stop Scanning
            </button>
          ) : (
            <button
              className="start-scan"
              onClick={handleStartClick}
              style={buttonStyles}
            >
              Start Scanning
            </button>
          )}
        </div>

        {error && (
          <div style={errorModalStyles}>
            <div>{error}</div>
            <button style={errorButtonStyles} onClick={closeErrorModal}>
              Close
            </button>
          </div>
        )}

        {successMessage && (
          <div style={successModalStyles}>
            <div style={checkmarkStyles}>&#10004;</div>
            <div>{successMessage}</div>
            <button style={succussButtonStyles} onClick={closeSuccessModal}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Scan;
