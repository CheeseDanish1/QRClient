import React, { useEffect, useRef, useState } from "react";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "../../../hooks/useAuth";
import { uploadProfilePicture, updateUserGeneral } from "../../../utils/api";

const API_URI = process.env.REACT_APP_API_URI;

export function General({ setError, setSaving }) {
  // State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const fileRef = useRef(null);
  const { user, updateUserProperty, updateUserGeneralPage } = useAuth();

  // Set state variables once user loads
  useEffect(() => {
    if (user) {
      setFirstName(user?.name?.first || "");
      setLastName(user?.name?.last || "");
      setEmail(user.email || "");
      setUsername(user.username || "");
      setPhoneNumber(user.phoneNumber || "");
      setStreetAddress(user?.address?.street || "");
      setZipCode(user?.address?.zip || "");
      setCity(user?.address?.city || "");
    }
  }, [user]);

  function openFile() {
    fileRef.current.click();
  }

  function imageUpload(event) {
    const file = new FormData();
    file.append("image", event.target.files[0], event.target.files[0].name);

    uploadProfilePicture({ image: file }).then((data) => {
      updateUserProperty("profileImagePath", data.filename);
    });
  }

  function save() {
    const newUserInfo = {
      username: username,
      name: {
        first: firstName,
        last: lastName,
      },
      email,
      phoneNumber,
      address: {
        street: streetAddress,
        zip: zipCode,
        city,
      },
    };

    updateUserGeneral(newUserInfo).then((res) => {
      if (res.data.error) return setError(res.data.message);

      updateUserGeneralPage(newUserInfo);
      setSaving(true);
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
        {!!user.profileImagePath ? (
          <Avatar
            sx={{ height: 100, width: 100, borderRadius: "100%" }}
            src={`${API_URI}/image/${user.profileImagePath}`}
          >
            <img
              src="/images/default-user.jpg"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "100%",
              }}
              alt="profile"
            />
          </Avatar>
        ) : (
          <Avatar
            sx={{ height: 100, width: 100, borderRadius: "100%" }}
            src="/images/default-user.jpg"
          />
        )}
      </Badge>
      <div className="settings-inputs">
        <div className="settings-first">
          <p>First Name</p>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-last">
          <p>Last Name</p>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-email">
          <p>Email Address</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-username">
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-phone">
          <p>Phone Number</p>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-address">
          <p>Street Address</p>
          <input
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-zip">
          <p>ZIP Code</p>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-city">
          <p>City</p>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-save">
          <button onClick={save} className="button-dark settings-save-button">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default General;
