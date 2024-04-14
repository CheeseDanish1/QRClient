import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import DashboardRow from "./DashboardRow";
import { getUsernameFromId } from "../../../utils/api";

function EventTable({ user, archived }) {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    // Loading usernames
    if (user && usernames.length === 0) {
      // Remove any duplicates
      const createdByArr = user.events.filter(
        (event, index) =>
          user.events.findIndex(
            (e) => e.createdBy.uuid === event.createdBy.uuid
          ) === index
      );
      createdByArr.forEach((event) => {
        getUsernameFromId(event.createdBy.uuid).then((res) => {
          setUsernames((prev) => {
            return [
              ...prev,
              {
                username: res.data.username,
                uuid: event.createdBy.uuid,
              },
            ];
          });
        });
      });
    }
  }, [user, usernames]);

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
            <p
              style={{
                fontFamily: "Roboto",
                marginTop: 25,
                marginLeft: 10,
              }}
            >
              No Events {archived ? "Archived" : "Active"}
            </p>
          ) : (
            user.events
              .filter((event) => event.archived === archived)
              .map((event, i) => {
                return (
                  <DashboardRow
                    user={user}
                    key={i}
                    index={i}
                    event={event}
                    usernames={usernames}
                  />
                );
              })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EventTable;
