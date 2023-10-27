import React, { useEffect, useState } from "react";
import Scan from "./Pages/Scan";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Event from "./Pages/Event";
import Page404 from "./Pages/Page404";
import QrCode from "./Components/QrCode";
import Redeem from "./Pages/Redeem";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import { useAuth } from "./hooks/useAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Page404 />,
    errorElement: <Page404 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/scan",
    element: <Scan />,
    errorElement: <Page404 />,
  },
  {
    path: "/event/:eventId",
    element: <Event />,
  },
  {
    path: "/redeem/:userId",
    element: <Redeem />,
  },
  {
    path: "/qrcode/:userId",
    element: <QrCode />,
  },
]);

export default function Main() {
  const [spinner, setSpinner] = useState(false);
  const { isUser, isLoading } = useAuth();

  useEffect(() => {
    console.log(isLoading);
    setSpinner(!isLoading);
  }, [isLoading]);

  useEffect(() => {
    isUser();
    // Adding isUser as a dependency causes an infinite request loop
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!spinner}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <RouterProvider router={router} />
    </div>
  );
}
