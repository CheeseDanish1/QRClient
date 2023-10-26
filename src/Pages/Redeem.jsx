import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { approveSubmission } from "../utils/api";

const styles = {
  modalContainer: {
    position: "fixed",
    width: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    padding: 20,
    textAlign: "center",
  },
  successModalContainer: {
    backgroundColor: "#4CAF50",
  },
  errorModalContainer: {
    backgroundColor: "#DC3545",
  },
  iconContainer: {
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    width: 100,
    height: 100,
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 48,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    lineHeight: "1.5",
  },
  closeButton: {
    marginTop: 20,
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    cursor: "pointer",
    border: "none",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    outline: "none",
  },
  successCloseButton: {
    backgroundColor: "#4CAF50",
  },
  closeButtonText: {
    color: "#fff",
  },
};

const Redeem = () => {
  document.title = "Redeem code";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      setError("No Submission ID Provided");
      setLoading(false);
      return;
    }

    approveSubmission({ userId })
      .then((res) => {
        setLoading(false);
        if (res.error) setError(res.message);
        else setSuccess(true);
      })
      .catch((error) => {
        setError("An error occurred while processing your request.");
        setLoading(false);
      });
  }, [userId]);

  const renderSuccessModal = () => (
    <div style={{ ...styles.modalContainer, ...styles.successModalContainer }}>
      <div style={styles.iconContainer}>
        <span style={styles.icon}>✔️</span>
      </div>
      <p style={styles.title}>Success!</p>
      <p style={styles.message}>This user has been successfully verified</p>
    </div>
  );

  const renderErrorModal = () => (
    <div style={{ ...styles.modalContainer, ...styles.errorModalContainer }}>
      <div style={{ ...styles.iconContainer, backgroundColor: "" }}>
        <span style={styles.icon}>❌</span>
      </div>
      <p style={styles.title}>Error!</p>
      <p style={styles.message}>{error}</p>
    </div>
  );

  if (loading) return <div>Loading...</div>;

  if (success) return renderSuccessModal();

  if (error) return renderErrorModal();

  return null; // Return null if none of the conditions are met
};

export default Redeem;
