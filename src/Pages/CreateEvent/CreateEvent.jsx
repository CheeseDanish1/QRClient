import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { addEvent } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";

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

function CreateEvent({ open, handleClose }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { addUserEvents, user } = useAuth();

  function onSubmit() {
    if (!title) return setError("Must include title");
    addEvent({
      companyName: title,
      text: {
        eventLandingText: "Default Landing Text",
      },
      enabled: {
        image: false,
        maxCapacity: false,
      },
      createdBy: {
        uuid: user.id,
      },
      fields: {
        name: true,
        email: true,
        phone: true,
        age: true,
      },
    }).then((res) => {
      if (res.error) return setError(res.message);
      setError("");
      addUserEvents(res.event);
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
            Create GiveAway
          </Typography>
          <div className="description" style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontFamily: "Roboto" }}>
              Giveaway Title
            </p>
            <input
              style={{ marginTop: 10 }}
              id="title"
              className="input-field"
              placeholder="Add a description"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              Create
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateEvent;
