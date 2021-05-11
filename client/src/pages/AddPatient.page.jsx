import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { grey, indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { listOfBloodGroup, areaLocation } from "../utils/constants";
import Notification from "../components/Notification.component";
import HospitalDonorList from "../components/HospitalDonorList.component";
import axios from "axios";

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
    marginTop: 8,
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
  const [bloodGroup, setBloodGroup] = useState("");
  const [area, setArea] = useState("");
  const [donorList, setDonorList] = useState([]);
  const [patientInformation, setPatientInformation] = useState({
    fullName: "",
    phoneNumber: "",
    age: "",
    address: "",
    userName: "",
    password: "",
  });

  const { fullName, phoneNumber, age, address, userName, password } = patientInformation;

  const handleChange = (e) => setPatientInformation({ ...patientInformation, [e.target.name]: e.target.value });
  const handleBloodGroup = (e) => setBloodGroup(e.target.value);
  const handleAreaLocation = (e) => setArea(e.target.value);
  const handleAvailabilityChange = (e) => setAvailability(e.target.checked);
  const toggleAddPatientForm = () => setShowForm(!showForm);
  const handleValidation = () => {
    const validateNumber = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(phoneNumber);
    if (!validateNumber) {
      return Notification("Warning", "Invalid phone number", "warning");
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (handleValidation()) {
      const information = {
        hospital: localStorage.getItem("id"),
        user: {
          userName: userName,
          name: fullName,
          password: password,
          phone: phoneNumber,
          address: address,
          role: "doner",
        },
        doner: {
          age: age,
          bloodGroup: bloodGroup,
          area: area,
          status: availability,
          isComplete: true,
        },
      };

      axios
        .post("/auth/signup-user", information)
        .then((res) => {
          console.log(res);
          Notification("Success", "Donor account created successfully", "success");
          getHospitalDonors();
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
          setPatientInformation({ fullName: "", phoneNumber: "", age: "", address: "", userName: "", password: "" });
          setBloodGroup("");
          setArea("");
        });
    } else {
      setLoading(false);
    }
  };

  const getHospitalDonors = () => {
    axios
      .get(`/hospital/profile/${localStorage.getItem("id")}/doner`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setDonorList(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  useEffect(() => getHospitalDonors(), []);

  return (
    <div>
      <Container maxWidth="lg" className={classes.margin}>
        <Grid container>
          <Tooltip title="Add new donor">
            <Grid item xs={2}>
              <Paper elevation={0} className={classes.paper} onClick={toggleAddPatientForm}>
                <AddRoundedIcon className={classes.icon} />
              </Paper>
            </Grid>
          </Tooltip>
        </Grid>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} className={classes.margin}>
              <Grid item xs={12}>
                <TextField label="Full Name" required variant="outlined" name="fullName" value={fullName} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Phone Number" type="number" required variant="outlined" name="phoneNumber" value={phoneNumber} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Age" type="number" required variant="outlined" name="age" value={age} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel>Blood Group</InputLabel>
                  <Select variant="outlined" value={bloodGroup} onChange={handleBloodGroup} label="Blood Group">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {listOfBloodGroup.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel>Select Area</InputLabel>
                  <Select variant="outlined" value={area} onChange={handleAreaLocation} label="Blood Group">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {areaLocation.map((el) => (
                      <MenuItem key={el.id} value={el.id}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address" required variant="outlined" name="address" rows={4} value={address} onChange={handleChange} multiline fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Username" required variant="outlined" name="userName" value={userName} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Password" type="password" required variant="outlined" name="password" value={password} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={availability} onChange={handleAvailabilityChange} name="availability" color="primary" />}
                  label="I am available to donate blood"
                  className={classes.available}
                />
              </Grid>
              <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submit} disabled={loading}>
                {loading ? "Creating profile..." : "Submit"}
              </Button>
            </Grid>
          </form>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h4">Donor List</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {donorList.length !== 0 ? (
              <HospitalDonorList donorList={donorList} />
            ) : (
              <Box display="flex" justifyContent="center">
                <Typography variant="h5">Data Not Found</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AddPatient;
