import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./index.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";

function Dashboard() {
  document.title = "Event Dashboard";

  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  if (!user) return;

  return (
    <RenderAuthPage>
      <div
        className="header"
        style={{
          padding: 50,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 150,
            width: 150,
            // backgroundColor: "red",
            borderRadius: "100%",
            marginRight: 30,
          }}
          className="image"
        >
          <img
            src={
              !!user.profileImagePath
                ? `/api/image/${user.profileImagePath}`
                : "/images/default-user/jpg"
            }
            alt="profile"
            style={{
              height: 150,
              width: 150,
              display: "inline-block",
              borderRadius: " 100%",
            }}
          />
        </div>
        <div className="info">
          <h3 style={{ fontFamily: "Roboto" }}>{user.username}</h3>
          <h1 style={{ fontFamily: "Roboto" }}>Shared with me</h1>
        </div>
      </div>
      <div style={{ width: "90%", display: "flex", justifyContent: "end" }}>
        <button
          onClick={() => navigate("/dashboard/create")}
          className="button-dark"
        >
          Create New
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Last Edited</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.events.length === 0 && (
                  <p
                    style={{
                      fontFamily: "Roboto",
                      marginTop: 25,
                      marginLeft: 10,
                    }}
                  >
                    No Giveaways Created
                  </p>
                )}
                {user.events.map((event, i) => {
                  return (
                    <TableRow
                      hover
                      key={i}
                      onClick={() => navigate(`/dashboard/${event.uuid}`)}
                      role="checkbox"
                      tabIndex={-1}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: i % 2 === 1 ? "" : "#eaeaea",
                      }}
                    >
                      <TableCell>{event.companyName}</TableCell>
                      <TableCell>{event.createdBy.username}</TableCell>
                      <TableCell>{formatDate(event.timeCreated)}</TableCell>
                      <TableCell>
                        {event.lastUpdated
                          ? formatDate(event.lastUpdated)
                          : formatDate(event.timeCreated)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </RenderAuthPage>
  );
}

function formatDate(date) {
  date = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get individual date components
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Create the formatted date
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}

export default Dashboard;
