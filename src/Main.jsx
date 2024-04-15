import React, { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useSpinner } from "./hooks/useSpinner";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { RouterProvider } from "react-router-dom";
// import Scan from "./Pages/Scan";
// import Event from "./Pages/EventSubmission/EventSubmission";
// import Page404 from "./Pages/Page404";
// import QrCode from "./Components/QrCode";
// import Redeem from "./Pages/Redeem";
// import Login from "./Pages/Authentication/Login";
// import Signup from "./Pages/Authentication/Signup";
// import Dashboard from "./Pages/Dashboard/Dashboard";
// import ManageEvent from "./Pages/ManageEvent/ManageEvent";
// import Settings from "./Pages/Settings/Settings";
// import Analytics from "./Pages/Analytics/Analytics";
// import Archived from "./Pages/Archived/ArchivedDashboard";
import router from "./router/Router";

export default function Main() {
  // const [spinner, setSpinner] = useState(false);
  const { isUser, isLoading } = useAuth();

  const { loading, setLoading } = useSpinner();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    isUser();
    // Adding isUser as a dependency causes an infinite request loop
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <RouterProvider router={router} />
    </div>
  );
}
