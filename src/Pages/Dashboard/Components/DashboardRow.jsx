import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

function DashboardRow({ event, index }) {
  const navigate = useNavigate();

  return (
    <TableRow
      hover
      onClick={() => navigate(`/dashboard/${event.uuid}`)}
      role="checkbox"
      tabIndex={-1}
      sx={{
        cursor: "pointer",
        backgroundColor: index % 2 === 1 ? "" : "#eaeaea",
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

export default DashboardRow;
