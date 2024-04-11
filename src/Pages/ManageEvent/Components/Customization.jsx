import React, { useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { SketchPicker } from "react-color";
import Switch from "@mui/material/Switch";
import { uploadImage } from "../../../utils/api";

const API_URI = process.env.REACT_APP_API_URI;

function Customization({
  color,
  setColor,
  imageEnabled,
  imagePath,
  setImageEnabled,
  setImagePath,
}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const imageFile = useRef(null);

  function openImageSelection() {
    imageFile.current.click();
  }

  function updateColor(newColor) {
    setColor(newColor.hex);
  }

  function imageSwitch(event) {
    setImageEnabled(event.target.checked);
  }

  function imageUpload(event) {
    const file = new FormData();
    file.append("image", event.target.files[0], event.target.files[0].name);

    uploadImage(imageEnabled, file).then((data) => {
      setImagePath(data.filename);
    });
  }

  const styles = {
    color: {
      width: "36px",
      height: "14px",
      borderRadius: "2px",
      background: color,
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      // position: "absolute",
      zIndex: "2",
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };

  return (
    <div className="item three">
      <div className="inner">
        <h3 style={{ marginTop: 10 }}>Page Customization</h3>
        <div style={{ marginTop: 30 }} className="font-color">
          <p style={{ fontWeight: "bold" }}>Text Font Color</p>
          <div className="color-picker">
            <div
              style={styles.swatch}
              onClick={() => setDisplayColorPicker(!displayColorPicker)}
            >
              <div style={styles.color} />
            </div>
            {displayColorPicker ? (
              <div style={styles.popover}>
                <div
                  style={styles.cover}
                  onClick={() => setDisplayColorPicker(false)}
                />
                <SketchPicker color={color} onChange={updateColor} />
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ marginTop: 30 }} className="file-upload">
          <div
            className="background-image"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Background Image</p>
            <Switch onChange={imageSwitch} checked={imageEnabled} />
          </div>
          <label className="drop-area" htmlFor="input-file">
            <input
              disabled={!imageEnabled}
              ref={imageFile}
              id="input-file"
              accept="image/*"
              type="file"
              onChange={imageUpload}
              hidden
            />
            <button
              onClick={openImageSelection}
              className={`sleek-button ${imageEnabled ? "" : "image-disabled"}`}
            >
              <FileUploadIcon />
              Click or drop image
            </button>
          </label>
          {!!imagePath && (
            <a
              href={`${API_URI}/image/${imagePath}`}
              target="_blank"
              rel="noreferrer"
            >
              {imagePath}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customization;
