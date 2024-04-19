import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function SubmissionTableRow({ submission, event, index }) {
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      sx={{
        cursor: "pointer",
        backgroundColor: index % 2 === 1 ? "" : "#eaeaea",
      }}
    >
      {event.fields.name && <TableCell>{submission.fields.name}</TableCell>}
      {event.fields.email && <TableCell>{submission.fields.email}</TableCell>}
      {event.fields.phone && <TableCell>{submission.fields.phone}</TableCell>}
      {event.fields.age && (
        <TableCell>{formatDate(submission.fields.age)}</TableCell>
      )}
      {submission.fields.custom.length >= 1 &&
        submission.fields.custom.map((r, i) => (
          <TableCell key={i}>{r.value}</TableCell>
        ))}
      <TableCell>{formateDate2(submission.timeSubmitted)}</TableCell>
      <TableCell>
        {submission.prizeClaimed ? submission.timePrizeClaimed : "Not claimed"}
      </TableCell>
      <TableCell>{submission.consent + ""}</TableCell>
    </TableRow>
  );
}

function formateDate2(date) {
  date = parseInt(date);
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

  // Get time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Create the formatted date with time
  const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

function formatDate(date) {
  // For some reason the date ends with z
  // This causes dates to be the day before
  // This is removed
  let splitDate = date.split("");
  splitDate.pop();
  date = splitDate.join("");

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

export default SubmissionTableRow;
