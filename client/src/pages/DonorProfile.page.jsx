import React, { useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "../components/Notification.component";

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

function DonorProfile() {
  const classes = useStyles();
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAvailabilityChange = (e) => setAvailability(e.target.checked);

  return (
    <div>
      <Container maxWidth="lg">
        <form fullWidth>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="warning" className={classes.margin}>
                <AlertTitle>Warning</AlertTitle>
                <Typography variant="body1">Your profile is not ready yet. Please update your profile to get yourself on the donor list.</Typography>
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h4">Profile Information</Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <TextField label="Username" required readOnly name="username" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Full Name" required readOnly name="fullName" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Phone Number" required name="phoneNumber" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Blood Group" required readOnly name="bloodGroup" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Age" required name="age" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Checkbox checked={availability} onChange={handleAvailabilityChange} name="availability" color="primary" />}
                label="I am available to donate blood"
                className={classes.available}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address" required name="address" fullWidth variant="outlined" rows={4} multiline />
            </Grid>
            <Button variant="contained" color="primary" fullWidth className={classes.submit}>
              {loading ? "Updating profile..." : "Submit"}
            </Button>
          </Grid>
        </form>
      </Container>
    </div>
  );
}

export default DonorProfile;
