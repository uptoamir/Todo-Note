import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import { Button, IconButton } from "@material-ui/core";
import type { RootState } from "../../store";

const RecentNotes = () => {
  const [notes, setNotes] = useState([1, 2, 3]);
  const data = useSelector((state: RootState) => state.note.data);
  // console.log(data[0].created_at.toString().split("T").join(" ").split(".")[0]);
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="Home" />
      </AdminAppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="div">
          My Notes - 3 Recent
        </Typography>
        <Button component={Link} to={`/${process.env.PUBLIC_URL}/admin/notes`}>
          View All
        </Button>
      </div>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {data.slice(0, 3).map(function (element, index) {
          return (
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <Card>
                <CardActionArea disabled={true}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {element.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {element.description}
                    </Typography>
                    <div></div>
                  </CardContent>
                  <CardActions>
                    <Typography
                      variant="caption"
                      component="div"
                      sx={{ flexGrow: 1 }}
                    >
                      {
                        element.created_at
                          .toString()
                          .split("T")
                          .join(" ")
                          .split(".")[0]
                      }
                    </Typography>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default RecentNotes;
