import React, { useRef } from "react";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../../hooks/useAuth";
import { uploadProfilePicture } from "../../../utils/api";
import constants from "../../../constants.json";

function General() {
  const fileRef = useRef(null);
  const { user, updateUserProperty } = useAuth();

  function openFile() {
    fileRef.current.click();
  }

  function imageUpload(event) {
    console.log("Ran");
    const file = new FormData();
    file.append("image", event.target.files[0], event.target.files[0].name);

    console.log("What");
    uploadProfilePicture({ image: file }).then((data) => {
      updateUserProperty("profileImagePath", data.filename);
    });
  }

  if (!user) return <></>;

  return (
    <div style={{ marginTop: 20, padding: 10 }}>
      <input
        ref={fileRef}
        disabled={false}
        accept="image/*"
        type="file"
        hidden={true}
        onChange={imageUpload}
      />
      <Badge
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={<EditIcon />}
        overlap="circular"
        color="primary"
        sx={{ cursor: "pointer" }}
        onClick={openFile}
        onChange={imageUpload}
      >
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={
            !!user.profileImagePath
              ? `/api/image/${user.profileImagePath}`
              : "/images/default-user/jpg"
          }
        />
      </Badge>
      <div className="settings-inputs">
        <div className="settings-first">
          <p>First Name</p>
          <input className="settings-input" />
        </div>
        <div className="settings-last">
          <p>Last Name</p>
          <input className="settings-input" />
        </div>
        <div className="settings-email">
          <p>Email Address</p>
          <input className="settings-input" />
        </div>
        <div className="settings-phone">
          <p>Phone Number</p>
          <input className="settings-input" />
        </div>
        <div className="settings-address">
          <p>Street Address</p>
          <input className="settings-input" />
        </div>
        <div className="settings-zip">
          <p>ZIP Code</p>
          <input className="settings-input" />
        </div>
        <div className="settings-city">
          <p>City</p>
          <input className="settings-input" />
        </div>
        <div className="settings-save">
          <button className="button-dark settings-save-button">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default General;
