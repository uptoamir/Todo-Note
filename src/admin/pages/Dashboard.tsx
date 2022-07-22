import React from "react";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import Todo from "../components/Todo";
import RecentNotes from "../components/RecentNotes";
import Grid from "@material-ui/core/Grid";

const Dashboard = () => {
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="Home" />
      </AdminAppBar>
      <Grid container direction="column" spacing={2}>
        <Todo />
        <RecentNotes />
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
