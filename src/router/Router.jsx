import { createBrowserRouter } from "react-router-dom";
import Scan from "../Pages/Scan";
import Event from "../Pages/EventSubmission/EventSubmission";
import Page404 from "../Pages/Page404";
import QrCode from "../Components/QrCode";
import Redeem from "../Pages/Redeem";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageEvent from "../Pages/ManageEvent/ManageEvent";
import Settings from "../Pages/Settings/Settings";
import Analytics from "../Pages/Analytics/Analytics";
import Archived from "../Pages/Archived/ArchivedDashboard";

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
    path: "/archive",
    element: <Archived />,
  },
  {
    path: "/dashboard/:eventId",
    element: <ManageEvent />,
  },
  {
    path: "/analytics/:eventId",
    element: <Analytics />,
  },
  {
    path: "/settings",
    element: <Settings />,
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

export default router;
