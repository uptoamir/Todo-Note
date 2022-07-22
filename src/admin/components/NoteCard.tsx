import React, { useState, Fragment, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const NoteCard = (props: any) => {
  const { title, description = null, created_at } = props.note || {};
  const { onEdit, onDelete } = props;
  const date = created_at.toString().split("T").join(" ").split(".")[0];
  return (
    <Fragment>
      <Card>
        {/* <CardActionArea> */}
        <CardContent>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
            {description}
          </Typography>
          <div></div>
        </CardContent>
        <CardActions>
          <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
            {date}
          </Typography>
          <Button onClick={(ev) => onEdit(props.note)}>
            <EditIcon fontSize="small" />

            <Typography variant="caption" component="div" sx={{ margin: 0.4 }}>
              Edit
            </Typography>
          </Button>
          <Button onClick={(ev) => onDelete(props.note)}>
            <DeleteIcon color="error" fontSize="small" />

            <Typography
              color="error"
              variant="caption"
              component="div"
              sx={{ margin: 0.4 }}
            >
              Delete
            </Typography>
          </Button>
        </CardActions>
        {/* </CardActionArea> */}
      </Card>
    </Fragment>
  );
};

export default NoteCard;
