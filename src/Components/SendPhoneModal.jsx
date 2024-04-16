import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { sendTestMessage } from "../utils/api";
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

function SendPhoneModal({ open, handleClose, messageContent }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    setPhone(user.phoneNumber);
  }, [user]);

  useEffect(() => {
    setError("");
  }, [open]);

  function onSubmit() {
    if (!phone) setError("Must include email");

    sendTestMessage({
      messageContent,
      number: phone,
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
            Send a Test Phone Message
          </Typography>
          <div className="description" style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontFamily: "Roboto" }}>
              Phone Number
            </p>
            <input
              id="title"
              className="input-field input-modal"
              //   placeholder="Add a title"
              value={phone}
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
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

export default SendPhoneModal;
