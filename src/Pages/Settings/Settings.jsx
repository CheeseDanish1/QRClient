import React, { useState } from "react";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { General, Notifications, Security, Tab } from "./Components/";
import "./index.css";

const tabs = [
  {
    name: "General Info",
    id: "info",
    icon: <PersonIcon />,
    render: <General />,
  },
  {
    name: "Password and Security",
    id: "security",
    icon: <LockIcon />,
    render: <Security />,
  },
  {
    name: "Notifications",
    id: "notifications",
    icon: <NotificationsIcon />,
    render: <Notifications />,
  },
];

function Settings() {
  const [settingsTab, setSettingsTab] = useState("info");
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
        <RenderSettings state={settingsTab} />
      </div>
    </RenderAuthPage>
  );
}

function RenderSettings({ state }) {
  const indexOf = tabs.findIndex((tab) => tab.id === state);
  return indexOf >= 0 ? tabs[indexOf].render : tabs[0].render;
}

export default Settings;
