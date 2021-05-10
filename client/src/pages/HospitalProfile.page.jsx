import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification.component";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 10,
  },
  available: {
    marginTop: 10,
  },
  submit: {
    margin: theme.spacing(3),
  },
}));

function HospitalProfile() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [hospitalProfile, setHospitalProfile] = useState({
    hospitalUserName: "",
    hospitalName: "",
    phoneNumber: "",
    websiteName: "",
    address: "",
    status: true,
  });
  const { hospitalUserName, hospitalName, phoneNumber, websiteName, address, status } = hospitalProfile;

  const handleChange = (e) => setHospitalProfile({ ...hospitalProfile, [e.target.name]: e.target.value });

  const handleValidation = () => {
    const validateNumber = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(phoneNumber);
    if (!validateNumber) return Notification("Warning", "Phone number is not valid", "warning");
    return true;
  };

  const getHospitalInformation = () => {
    console.log(localStorage.getItem("id"));
    axios
      .get(`/hospital/profile/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        let info = res.data.data;
        setHospitalProfile({
          status: info.status,
          hospitalUserName: info.user.userName,
          hospitalName: info.user.name,
          phoneNumber: info.user.phone,
          websiteName: info.website || "",
          address: info.user.address || "",
        });
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  useEffect(() => {
    getHospitalInformation();
  }, []);

  const handleSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
    setLoading(true);

    const information = {
      userName: hospitalUserName,
      name: hospitalName,
      phone: phoneNumber,
      website: websiteName,
      address: address,
    };

    if (handleValidation()) {
      axios
        .patch(`/hospital/profile/${localStorage.getItem("id")}/modify`, information, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          Notification("Success", "Profile updated successfully", "success");
          getHospitalInformation();
        })
        .catch((err) => {
          if (err.response.data.message) {
            Notification("Error", `${err.response.data.message}`, "error");
          } else {
            Notification("Error", "Something went wrong. Please check your internet connection", "error");
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!status && (
              <Grid item xs={12}>
                <Alert severity="error" className={classes.margin}>
                  <AlertTitle>Pending Request</AlertTitle>
                  <Typography variant="body1"> Your request is being processed. Please wait until admin confirms your account. </Typography>
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h4">Hospital Information</Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <TextField label="Hospital Username" required variant="outlined" name="hospitalUserName" value={hospitalUserName} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Hospital Name" required variant="outlined" name="hospitalName" value={hospitalName} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Phone Number" required variant="outlined" name="phoneNumber" value={phoneNumber} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Website Name" variant="outlined" name="websiteName" value={websiteName} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField rows={4} multiline label="Address" required variant="outlined" name="address" value={address} onChange={handleChange} fullWidth />
            </Grid>
            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit} disabled={loading}>
              {loading ? "Updating profile..." : "Submit"}
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default HospitalProfile;
