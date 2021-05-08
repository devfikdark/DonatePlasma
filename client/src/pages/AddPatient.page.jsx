import React from "react";
import { Container, Grid, Paper, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { grey, indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 10,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "8em",
    borderRadius: 8,
    cursor: "pointer",
    border: "2px dashed grey",
    transition: ".2s all ease-in-out",

    "&:hover": {
      backgroundColor: grey[200],
    },
  },
  icon: {
    fontSize: "3em",
    color: indigo[800],
  },
  submit: {
    margin: theme.spacing(3),
  },
}));
function AddPatient() {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="lg" className={classes.margin}>
        <Grid container>
          <Tooltip title="Add new donor">
            <Grid item xs={2}>
              <Paper elevation={0} className={classes.paper}>
                <AddIcon className={classes.icon} />
              </Paper>
            </Grid>
          </Tooltip>
        </Grid>
      </Container>
    </div>
  );
}

export default AddPatient;
