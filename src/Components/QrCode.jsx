import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

import { useParams } from "react-router-dom";

function QrCode({ linkTo }) {
  document.title = "QR Code — Vending Promotions";
  const [imageLoading, setImageLoading] = useState(true);
  const [base64Image, setBase64Image] = useState(null);

  let { userId } = useParams();

  if (!userId) userId = linkTo;
  userId = decodeURIComponent(userId);

  useEffect(() => {
    QRCode.toDataURL(userId).then((url) => {
      setImageLoading(false);
      setBase64Image(url);
    });
  }, [userId]);

  if (imageLoading) return <p>Loading...</p>;

  return (
    <div>
      <img
        style={{ width: "255px" }}
        alt="QR Code"
        data-linkto={linkTo}
        src={base64Image}
      />
    </div>
  );
}

export default QrCode;
