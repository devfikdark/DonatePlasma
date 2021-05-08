import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  buttonStyle: {
    textTransform: "capitalize",
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Donate Plasma
          </Typography>
          <Link to="/">
            <Button color="inherit" className={classes.buttonStyle}>
              Donor List
            </Button>
          </Link>
          <Link to="/pending-hospitals">
            <Button color="inherit" className={classes.buttonStyle}>
              Hospital
            </Button>
          </Link>
          <Link to="/hospital-profile">
            <Button color="inherit" className={classes.buttonStyle}>
              Hospital Profile
            </Button>
          </Link>
          <Link to="/donor-profile">
            <Button color="inherit" className={classes.buttonStyle}>
              Profile
            </Button>
          </Link>
          <Link to="/login">
            <Button color="inherit" className={classes.buttonStyle}>
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button color="inherit" className={classes.buttonStyle}>
              Register
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
