import React, { useEffect } from "react";
import Scan from "./Pages/Scan";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Event from "./Pages/Event";
import Page404 from "./Pages/Page404";
import QrCode from "./Components/QrCode";
import Redeem from "./Pages/Redeem";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import { useAuth } from "./utils/useAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";

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
  const { isUser } = useAuth();

  useEffect(() => {
    isUser();
    // Adding isUser as a dependency causes an infinite request loop
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
