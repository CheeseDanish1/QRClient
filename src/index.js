// bimenet959@monutri.com
// Image in /documents

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./hooks/useAuth";
import { SpinnerProvider } from "./hooks/useSpinner";
import Main from "./Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SpinnerProvider>
        <Main />
      </SpinnerProvider>
    </AuthProvider>
  </React.StrictMode>
);
