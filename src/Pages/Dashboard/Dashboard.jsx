import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./index.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import RenderAuthPage from "../RenderAuthPage/RenderAuthPage";
import Avatar from "@mui/material/Avatar";
import CreateEvent from "../CreateEvent/CreateEvent";
import DashboardRow from "./Components/DashboardRow";
import { getUsernameFromId } from "../../utils/api";

const style = {
  dashboardHeader: {
    padding: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dashboardImage: {
    height: 150,
    width: 150,
    borderRadius: "100%",
    marginRight: 30,
  },
  dashboardAvatar: {
    height: 150,
    width: 150,
    borderRadius: "100%",
  },
  dashboardTitle: {
    fontFamily: "Roboto",
    marginTop: 25,
    marginLeft: 10,
  },
  dashboardButtonContainer: {
    width: "90%",
    display: "flex",
    justifyContent: "end",
  },
};

function Dashboard() {
  document.title = "Event Dashboard";

  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [usernames, setUsernames] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [user, isLoading, navigate]);

  useEffect(() => {
    // Load usernames incase they have changed
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

  if (!user) return;

  return (
    <RenderAuthPage>
      <div className="header" style={style.dashboardHeader}>
        <div style={style.dashboardImage} className="image">
          <Avatar
            sx={style.dashboardAvatar}
            src={
              !!user.profileImagePath
                ? `/api/image/${user.profileImagePath}`
                : "/images/default-user/jpg"
            }
          />
        </div>
        <div className="info">
          <h3 style={{ fontFamily: "Roboto" }}>{user.username}</h3>
          <h1 style={{ fontFamily: "Roboto" }}>Shared with me</h1>
        </div>
      </div>
      <div style={style.dashboardButtonContainer}>
        <button onClick={() => setShowModal(true)} className="button-dark">
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
                {user.events.length === 0 ? (
                  <p style={style.dashboardTitle}>No Giveaways Created</p>
                ) : (
                  user.events.map((event, i) => {
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
        </div>
      </div>
      <CreateEvent handleClose={() => setShowModal(false)} open={showModal} />
    </RenderAuthPage>
  );
}

export default Dashboard;
