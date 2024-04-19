import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import SubmissionTableRow from "./SubmissionTableRow";

function SubmissionTable({ submissions, event }) {
  // Probably remove this
  // If any of the submission have a custom field answered
  // Add it too

  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {event.fields.name && <TableCell>Name</TableCell>}
            {event.fields.email && <TableCell>Email</TableCell>}
            {event.fields.phone && <TableCell>Phone</TableCell>}
            {event.fields.age && <TableCell>Birthday</TableCell>}
            {submissions.length >= 1 &&
              submissions[0].fields.custom.length >= 1 &&
              submissions[0].fields.custom.map((r, i) => (
                <TableCell key={i}>{r.title}</TableCell>
              ))}
            <TableCell>Time Submitted</TableCell>
            <TableCell>Time Claimed</TableCell>
            <TableCell>Further Advertisement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.length === 0 ? (
            <p className="roboto naming-is-hard">No Submissions</p>
          ) : (
            submissions.map((submission, index) => {
              return (
                <SubmissionTableRow
                  key={index}
                  index={index}
                  submission={submission}
                  event={event}
                />
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SubmissionTable;
