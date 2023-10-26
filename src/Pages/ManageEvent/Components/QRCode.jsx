import QrCode from "../../../Components/QrCode";

import constants from "../../../constants.json";

const APP_URI = constants.PRODUCTION_APP_URI;

function QRCode({ eventUUID }) {
  return (
    <div className="item two">
      <div className="inner">
        <h3 style={{ marginTop: 10, marginLeft: 20 }}>Permanent QR Code</h3>
        <div className="qr-code">
          <QrCode linkTo={APP_URI + "/event/" + eventUUID} />
        </div>
        <div className="add-event">
          <button className="share-button">Share</button>
        </div>
      </div>
    </div>
  );
}

export default QRCode;
