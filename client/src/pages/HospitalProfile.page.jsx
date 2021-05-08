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

  return (
    <div>
      <Container maxWidth="lg">
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="warning" className={classes.margin}>
                <AlertTitle>Warning</AlertTitle>
                <Typography variant="body1">Your profile is not ready yet. Please update your profile to get yourself on the donor list.</Typography>
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h4">Hospital Information</Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <TextField label="Hospital Username" required variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Hospital Name" required variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Phone Number" required variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Website Name" required variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField rows={4} multiline label="Address" required variant="outlined" fullWidth />
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

export default HospitalProfile;
