import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

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
  });
  const { hospitalUserName, hospitalName, phoneNumber, websiteName, address } = hospitalProfile;

  const handleChange = (e) => setHospitalProfile({ ...hospitalProfile, [e.target.name]: e.target.value });

  const handleValidation = () => {
    const validateNumber = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(phoneNumber);
    if (!validateNumber) return Notification("Warning", "Phone number is not valid", "warning");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="warning" className={classes.margin}>
                <AlertTitle>Warning</AlertTitle>
                <Typography variant="body1">Your profile is not ready yet. Please update your profile to get add patient as donor.</Typography>
              </Alert>
            </Grid>
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
