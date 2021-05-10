import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { listOfBloodGroup, areaLocation } from "../utils/constants";
import Notification from "../components/Notification.component";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 10,
  },
  available: {
    marginTop: 8,
  },
  submit: {
    margin: theme.spacing(3),
  },
}));

function DonorProfile() {
  const classes = useStyles();
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState("");
  const [area, setArea] = useState("");
  const [donorProfileInformation, setDonorProfileInformation] = useState({
    userName: "",
    fullName: "",
    phoneNumber: "",
    age: "",
    address: "",
    isComplete: true,
  });
  const { userName, fullName, phoneNumber, age, address, isComplete } = donorProfileInformation;

  const handleChange = (e) => setDonorProfileInformation({ ...donorProfileInformation, [e.target.name]: e.target.value });
  const handleAvailabilityChange = (e) => setAvailability(e.target.checked);
  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };
  const handleAreaLocation = (e) => {
    setArea(e.target.value);
  };
  const handleValidation = (e) => {
    if (area === "" || bloodGroup === "") return Notification("Warning", "Area and blood group is required", "warning");
    return true;
  };
  const getDonorInformation = () => {
    axios
      .get(`/doner/${localStorage.getItem("id")}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        const info = res.data.data;
        setDonorProfileInformation({
          userName: info.user.userName,
          fullName: info.user.name,
          phoneNumber: info.user.phone,
          age: info.age || "",
          address: info.user.address,
          isComplete: info.isComplete,
        });
        setAvailability(info.status);
        setArea(info.area);
        setBloodGroup(info.bloodGroup);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check you internet connection", "error");
        }
      });
  };

  useEffect(() => getDonorInformation(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      const information = {
        userName: userName,
        name: fullName,
        phone: phoneNumber,
        age: age,
        address: address,
        bloodGroup: bloodGroup,
        area: area,
        status: availability,
      };

      axios
        .patch(`/doner/${localStorage.getItem("id")}/modify`, information, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          Notification("Success", "Profile updated successfully", "success");
          getDonorInformation();
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
            {!isComplete && (
              <Grid item xs={12}>
                <Alert severity="error" className={classes.margin}>
                  <AlertTitle>Warning</AlertTitle>
                  <Typography variant="body1">Your profile is not ready yet. Please update your profile to get yourself on the donor list.</Typography>
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h4">Profile Information</Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <TextField label="Username" required readOnly name="userName" value={userName} onChange={handleChange} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Full Name" required readOnly name="fullName" value={fullName} onChange={handleChange} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Phone Number" required name="phoneNumber" value={phoneNumber} onChange={handleChange} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Age" type="number" required name="age" value={age} onChange={handleChange} fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Blood Group</InputLabel>
                <Select variant="outlined" value={bloodGroup} onChange={handleBloodGroup} label="Blood Group">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {listOfBloodGroup.map((el) => (
                    <MenuItem value={el.id}> {el.name} </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel required>Select Area</InputLabel>
                <Select variant="outlined" value={area} onChange={handleAreaLocation} label="Select Area">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {areaLocation.map((el) => (
                    <MenuItem value={el.id}> {el.name} </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField label="Address" required name="address" value={address} onChange={handleChange} fullWidth variant="outlined" rows={4} multiline />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={availability} onChange={handleAvailabilityChange} name="availability" color="primary" />}
                label="I am available to donate blood"
                className={classes.available}
              />
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

export default DonorProfile;
