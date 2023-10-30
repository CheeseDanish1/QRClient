import React from "react";

function Tab({ name, id, icon, state, setState }) {
  return (
    <div
      onClick={() => setState(id)}
      className={`settings-tab ${state === id ? "tab-active" : ""}`}
    >
      {icon}
      <p style={{ marginLeft: 10 }}>{name}</p>
    </div>
  );
}

export default Tab;
