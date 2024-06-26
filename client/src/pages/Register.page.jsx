import React, { useState } from "react";
import { Avatar, Grid, Typography, Container, CssBaseline, TextField, Button, CircularProgress, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, useHistory } from "react-router-dom";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
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
  fileButton: {
    marginRight: "1em",
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
    userName: "",
    hospitalName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const { name, hospitalName, registrationType, userName, phoneNumber, password, confirmPassword } = signUpForm;
  const [file, setFile] = useState({ filePath: "", fileName: "" });
  const { filePath, fileName } = file;
  // METHODS
  const handleValidation = () => {
    const validateNumber = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(phoneNumber);
    if (registrationType === "individual") {
      if (userName === "" || name === "" || phoneNumber === "" || password === "" || confirmPassword === "") return Notification("Warning", "All fields are required", "warning");
      if (password !== confirmPassword) {
        return Notification("Warning", "Password didn't match!", "warning");
      } else if (!validateNumber) {
        return Notification("Warning", "Invalid phone number", "warning");
      } else {
        return true;
      }
    } else {
      if (userName === "" || hospitalName === "" || phoneNumber === "" || filePath === "" || password === "" || confirmPassword === "")
        return Notification("Warning", "All fields are required", "warning");
      if (password !== confirmPassword) {
        return Notification("Warning", "Password didn't match!", "warning");
      } else if (!validateNumber) {
        return Notification("Warning", "Invalid phone number", "warning");
      } else {
        return true;
      }
    }
  };
  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile({ filePath: selectedFile, fileName: selectedFile.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      let information = {};
      // registration type is individual
      if (registrationType === "individual") {
        information = {
          user: {
            userName: userName,
            name: name,
            phone: phoneNumber,
            password: password,
            role: "doner",
          },
          doner: {
            status: false,
          },
        };
        console.log(information);

        // registration for individual donor
        axios
          .post("/auth/signup-user", information)
          .then((res) => {
            Notification("Success", "Account created successfully", "success");
            history.push("/login");
          })
          .catch((err) => {
            if (err.response.data.message) {
              Notification("Error", `${err.response.data.message}`, "error");
            } else {
              Notification("Error", "Something went wrong. Please check your internet connection", "error");
            }
          })
          .finally(() => {
            setLoading(false);
            setSignUpForm({ registrationType: "individual", name: "", phoneNumber: "", userName: "", password: "", confirmPassword: "" });
          });
      } else {
        // uploading image to cloudinary
        const formData = new FormData();
        formData.append("file", filePath);
        formData.append("upload_preset", "ml_default");
        const options = {
          method: "POST",
          body: formData,
        };

        const cloudInfo = await fetch("https://api.Cloudinary.com/v1_1/dck5ccwjv/raw/upload", options);
        const cloudResponse = await cloudInfo.json();

        information = {
          userName: userName,
          name: hospitalName,
          phone: phoneNumber,
          password: password,
          documents: cloudResponse.url,
          role: "hospital",
        };
        console.log(information);

        // registration for hospital
        axios
          .post("/auth/signup-hospital", information)
          .then((res) => {
            Notification("Success", "Account created successfully", "success");
            history.push("/login");
          })
          .catch((err) => {
            if (err.response.data.message) {
              Notification("Error", `${err.response.data.message}`, "error");
            } else {
              Notification("Error", "Something went wrong. Please check your internet connection", "error");
            }
          })
          .finally(() => {
            setLoading(false);
            setSignUpForm({ registrationType: "hospital", hospitalName: "", phoneNumber: "", userName: "", password: "", confirmPassword: "" });
          });
      }
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
                <FormControlLabel value="individual" control={<Radio color="primary" />} label="Individual" />
                <FormControlLabel value="hospital" control={<Radio color="primary" />} label="Hospital" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField required variant="outlined" name="userName" value={userName} fullWidth label="Username" onChange={handleChange} autoFocus />
            </Grid>
            {registrationType === "individual" && (
              <Grid item xs={12}>
                <TextField name="name" value={name} onChange={handleChange} variant="outlined" required fullWidth label="Full Name" />
              </Grid>
            )}
            {registrationType === "hospital" && (
              <Grid item xs={12}>
                <TextField name="hospitalName" value={hospitalName} onChange={handleChange} variant="outlined" required fullWidth label="Hospital Name" />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Phone Number" name="phoneNumber" value={phoneNumber} type="number" onChange={handleChange} />
            </Grid>
            {registrationType === "hospital" && (
              <Grid item xs={12}>
                <Button variant="outlined" color="primary" component="label" startIcon={<AttachFileRoundedIcon />} className={classes.fileButton}>
                  File Input
                  <input accept="image/*" type="file" hidden name="encryptFile" onChange={handleFileChange} />
                </Button>
                {fileName}
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" value={password} onChange={handleChange} label="Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm Password" type="password" />
            </Grid>
          </Grid>
          <div className={classes.wrapper}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" className={classes.redirect}>
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
