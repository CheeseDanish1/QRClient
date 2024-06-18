import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DashboardRow from "./DashboardRow";
// setShowModal is the create event modal
// It is passed in so we can suggest to create an event when no are made
function EventTable({ user, archived, setShowModal }) {
  if (!user.events) return <p>Loading</p>;

  return (
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
          {user.events.filter((event) => event.archived === archived).length ===
          0 ? (
            archived ? (
              <ArchivedMessage />
            ) : (
              <ActiveMessage setShowModal={setShowModal} />
            )
          ) : (
            user.events
              .filter((event) => event.archived === archived)
              .map((event, i) => {
                return (
                  <DashboardRow user={user} key={i} index={i} event={event} />
                );
              })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ActiveMessage({ setShowModal }) {
  return (
    <h3
      style={{
        fontFamily: "Roboto",
        marginTop: 25,
        marginLeft: 10,
      }}
    >
      You do not have any active events. Try{" "}
      <span
        onClick={() => setShowModal(true)}
        style={{
          color: "#0077ff",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        creating one
      </span>{" "}
      today!
    </h3>
  );
}

function ArchivedMessage() {
  return (
    <h3
      style={{
        fontFamily: "Roboto",
        marginTop: 25,
        marginLeft: 10,
      }}
    >
      You do not have any events archived.
    </h3>
  );
}

export default EventTable;
