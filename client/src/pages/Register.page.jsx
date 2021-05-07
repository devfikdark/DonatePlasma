import React, { useState } from "react";
import { Avatar, Grid, Typography, Container, CssBaseline, TextField, Button, CircularProgress, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { indigo } from "@material-ui/core/colors";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification.component";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: indigo[800],
    "&:hover": {
      backgroundColor: indigo[900],
    },
  },

  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();

  // STATES
  const [loading, setLoading] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    registrationType: "individual",
    name: "",
    hospitalName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const { name, hospitalName, registrationType, phoneNumber, password, confirmPassword } = signUpForm;

  // METHODS
  const handleValidation = () => {
    if (name === "" || password === "" || confirmPassword === "") {
      return Notification("Warning", "All fields are required", "warning");
    } else if (password !== confirmPassword) {
      return Notification("Warning", "Password didn't match!", "warning");
    } else {
      return true;
    }
  };
  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      const information = {
        fullName: name,
        password: password,
        role: "user",
      };
      console.log(information);
      axios
        .post("/auth/signup", information)
        .then((res) => {
          if (res.data.status === "ok") {
            Notification("Congratulations", "Your account is created successfully", "success");
            history.push("/login");
          } else {
            Notification("Error", `${res.data.message}`, "error");
          }
        })
        .finally(() => {
          setLoading(false);
          setSignUpForm({ name: "", email: "", password: "", confirmPassword: "" });
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register yourself
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RadioGroup aria-label="registration-type" name="registrationType" value={registrationType} onChange={handleChange}>
                <FormControlLabel value="individual" control={<Radio />} label="Individual" />
                <FormControlLabel value="hospital" control={<Radio />} label="Hospital" />
              </RadioGroup>
            </Grid>
            {registrationType === "individual" && (
              <Grid item xs={12}>
                <TextField autoFocus name="name" value={name} onChange={handleChange} variant="outlined" required fullWidth label="First Name*" />
              </Grid>
            )}
            {registrationType === "hospital" && (
              <Grid item xs={12}>
                <TextField autoFocus name="name" value={hospitalName} onChange={handleChange} variant="outlined" required fullWidth label="Hospital Name*" />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Phone Number*" name="phoneNumber" value={phoneNumber} type="number" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" value={password} onChange={handleChange} label="Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm Password" type="password" />
            </Grid>
          </Grid>
          <div className={classes.wrapper}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
              Register
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
