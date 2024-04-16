import { useState } from "react";
import QrCode from "../../../Components/QrCode";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const APP_URI = process.env.REACT_APP_APP_URI;

function QRCode({ eventUUID }) {
  const [saved, setSaved] = useState(false);

  function share() {
    navigator.clipboard.writeText(
      APP_URI + "/qrcode/" + encodeURIComponent(APP_URI + "/event/" + eventUUID)
    );
    setSaved(true);
  }

  function handleClass() {
    setSaved(false);
  }

  return (
    <div className="item two">
      <div className="inner">
        <h3 style={{ marginTop: 10, marginLeft: 20 }}>Permanent QR Code</h3>
        <div className="qr-code">
          <QrCode linkTo={APP_URI + "/event/" + eventUUID} />
        </div>
        <div className="add-event">
          <button className="share-button" onClick={share}>
            Share
          </button>
        </div>
      </div>
      <CopySnackbar handleClose={handleClass} saving={saved} />
    </div>
  );
}

function CopySnackbar({ saving, handleClose }) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={saving}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
      >
        Image link copied to clipboard
      </MuiAlert>
    </Snackbar>
  );
}

export default QRCode;
