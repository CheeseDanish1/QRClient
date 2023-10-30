import React, { useState } from "react";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { General, Notifications, Security, Tab } from "./Components/";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./index.css";

const tabs = [
  {
    name: "General Info",
    id: "info",
    icon: <PersonIcon />,
    render: General,
  },
  {
    name: "Password and Security",
    id: "security",
    icon: <LockIcon />,
    render: Security,
  },
  {
    name: "Notifications",
    id: "notifications",
    icon: <NotificationsIcon />,
    render: Notifications,
  },
];

function Settings() {
  const [settingsTab, setSettingsTab] = useState("info");
  const [error, setError] = useState("")

  return (
    <RenderAuthPage>
      <div style={{ padding: "20px 50px" }}>
        <h1 style={{ fontFamily: "Roboto" }}>Account Settings</h1>
        <div className="settings-selector">
          {tabs.map((tab) => {
            return (
              <Tab
                key={tab.id}
                name={tab.name}
                id={tab.id}
                icon={tab.icon}
                state={settingsTab}
                setState={setSettingsTab}
              />
            );
          })}
        </div>
        <RenderSettings setError={setError} state={settingsTab} />
      </div>
      <ErrorSnackbar error={error} setError={setError} />
    </RenderAuthPage>
  );
}

function ErrorSnackbar({ error, setError }) {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={!!error}
      autoHideDuration={3000}
      onClose={() => setError(null)}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={() => setError(null)}
        severity="error"
        sx={{ width: "100%" }}
      >
        {error}
      </MuiAlert>
    </Snackbar>
  );
}

function RenderSettings({ state, setError }) {
  const indexOf = tabs.findIndex((tab) => tab.id === state);
  let index = indexOf > 0 ? indexOf : 0;
  let Component = tabs[index].render; // Ensure the variable name starts with an uppercase letter for components.

  return <Component setError={setError} />;
}


export default Settings;
