import React, { useState } from "react";
import { Button, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { grey, indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { listOfBloodGroup } from "../utils/constants";
import Notification from "../components/Notification.component";

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
  available: {
    marginTop: 10,
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

  const [showForm, setShowForm] = useState(false);
  const [availability, setAvailability] = useState(true);
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState(listOfBloodGroup);

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
  };

  const handleAvailabilityChange = (e) => setAvailability(e.target.checked);

  const toggleAddPatientForm = () => setShowForm(!showForm);

  return (
    <div>
      <Container maxWidth="lg" className={classes.margin}>
        <Grid container>
          <Tooltip title="Add new donor">
            <Grid item xs={2}>
              <Paper elevation={0} className={classes.paper} onClick={toggleAddPatientForm}>
                <AddIcon className={classes.icon} />
              </Paper>
            </Grid>
          </Tooltip>
        </Grid>

        {showForm && (
          <form>
            <Grid container spacing={2} className={classes.margin}>
              <Grid item xs={6}>
                <TextField label="Full Name" required variant="outlined" name="fullName" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Phone Number" type="number" required variant="outlined" name="phoneNumber" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Age" type="number" required variant="outlined" name="age" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">Blood Group</InputLabel>
                  <Select variant="outlined" labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={bloodGroup} onChange={handleBloodGroup} label="Age">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={availability} onChange={handleAvailabilityChange} name="availability" color="primary" />}
                  label="I am available to donate blood"
                  className={classes.available}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address" required variant="outlined" name="address" rows={4} multiline fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Username" required variant="outlined" name="userName" fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Password" type="password" required variant="outlined" name="password" fullWidth />
              </Grid>
              <Button variant="contained" color="primary" fullWidth className={classes.submit}>
                {loading ? "Updating profile..." : "Submit"}
              </Button>
            </Grid>
          </form>
        )}
      </Container>
    </div>
  );
}

export default AddPatient;
