import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification.component";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "93vh",
  },
  image: {
    backgroundImage: "url(https://images.unsplash.com/photo-1596978759889-91e1a654faca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  redirect: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  // STATES
  const [loading, setLoading] = useState(false);
  const [signInInfo, setSignInInfo] = useState({
    userName: "",
    password: "",
  });
  const { userName, password } = signInInfo;

  // METHODS
  const handleValidation = () => {
    if (userName === "" || password === "") {
      return Notification("Warning", "All fields required", "warning");
    } else {
      return true;
    }
  };
  const handleChange = (e) => setSignInInfo({ ...signInInfo, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      axios
        .post("/auth/signin", { userName: userName, password: password })
        .then((res) => {
          console.log(res);
          if (res.data.data.role) {
            localStorage.setItem("userName", res.data.data.userName);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("role", res.data.data.role);
            history.push("/pending-hospitals");
          } else if (res.data.data.user) {
            console.log("line 85");
            localStorage.setItem("userName", res.data.data.user.userName);
            localStorage.setItem("role", res.data.data.user.role);
            localStorage.setItem("isComplete", res.data.data.isComplete);
            localStorage.setItem("status", res.data.data.status);
            localStorage.setItem("token", res.data.data.token);
          }

          if (res.data.data.user.role === "doner") {
            history.push("/donor-profile");
          } else {
            history.push("/hospital-profile");
          }

          window.location.reload();
        })
        .catch((err) => {
          if (err.response.data.message) {
            Notification("Error", `${err.response.data.message}`, "error");
          } else {
            Notification("Error", "Something went wrong. Please check your internet connection.", "error");
          }
        })
        .finally(() => {
          setLoading(false);
          setSignInInfo({ userName: "", password: "" });
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome back
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField variant="outlined" margin="normal" required fullWidth label="Username" name="userName" value={userName} onChange={handleChange} autoComplete="email" autoFocus />
            <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" value={password} onChange={handleChange} />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2" className={classes.redirect}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
