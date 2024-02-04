import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendTestEmail } from "../utils/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function AnalyticsModal({ open, handleClose, emailHTML }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  useEffect(() => {
    setError("");
  }, [open]);

  function onSubmit() {
    if (!email) setError("Must include email");

    sendTestEmail({
      emailAddress: email,
      emailHTML,
    }).then((res) => {
      if (res.data.error) setError(res.data.message);

      setError("");
      handleClose();
    });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Test Email Format
          </Typography>
          <div className="description" style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontFamily: "Roboto" }}>
              Email Address
            </p>
            <input
              id="title"
              className="input-field input-modal"
              placeholder="Add a title"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error && (
            <div
              className="error"
              style={{ marginTop: 20, color: "red", fontFamily: "Roboto" }}
            >
              {error}
            </div>
          )}
          <div className="submit" style={{ marginTop: 20 }}>
            <button onClick={onSubmit} className="share-button">
              Send
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AnalyticsModal;
