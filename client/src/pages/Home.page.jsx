import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DonorList from "../components/DonorList.component";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import RecordVoiceOverRoundedIcon from "@material-ui/icons/RecordVoiceOverRounded";
import { areaLocation, listOfBloodGroup } from "../utils/constants";
import Notification from "../components/Notification.component";
import FuzzySearch from "fuzzy-search";
import empty from "../images/nodata.svg";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  imgStyle: {
    borderRadius: 16,
    boxShadow: "14px 17px 14px -7px #A8A8A8",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  emptyLayout: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  filterButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },

  shoutButton: {
    boxShadow: "0px 8px 16px 0px #82b1ff",
  },

  confirmShoutButton: {
    marginLeft: "1em",
  },
}));

function Home() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [search, setSearch] = useState("");
  const [donorList, setDonorList] = useState([]);
  const [filteredDataset, setFilteredDataset] = useState([]);
  const [shoutInformation, setShoutInformation] = useState({
    name: "",
    phoneNumber: "",
  });
  const { name, phoneNumber } = shoutInformation;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBloodGroup = (e) => setBloodGroup(e.target.value);
  const handleAreaLocation = (e) => setArea(e.target.value);
  const handleChange = (e) => setShoutInformation({ ...shoutInformation, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getDonorList = () => {
    axios
      .get(`/doner/list`)
      .then((res) => {
        console.log(res);
        setDonorList(res.data.data);
        setFilteredDataset(res.data.data);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      });
  };

  useEffect(() => getDonorList(), []);

  const filterDonors = () => {
    let endPoint = "";
    let blood = bloodGroup.split("");
    const groupName = blood[0];
    let group = blood[1];
    if (group === "+") {
      group = 1;
    } else {
      group = 2;
    }
    console.log(bloodGroup);
    if (bloodGroup !== "") {
      endPoint = `/doner/list?bloodGroup=${groupName}&group=${group}`;
    } else if (area !== "") {
      endPoint = `/doner/list?area=${area}`;
    } else if (bloodGroup !== "" && area !== "") {
      endPoint = `/doner/list?bloodGroup=${groupName}&group=${group}&area=${area}`;
    } else {
      endPoint = `/doner/list`;
    }
    // console.log(groupId);

    axios
      .get(endPoint)
      .then((res) => {
        console.log(res.data.data);
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

  const searcher = new FuzzySearch(filteredDataset, ["name", "area", "bloodGroup"], { sort: true });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    if (search) {
      const result = searcher.search(search);
      console.log(result);
      setDonorList([...result]);
    } else {
      console.log(filteredDataset);
      setDonorList(filteredDataset);
    }
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">Donate Plasma Save Life.</Typography>
            <Box my={5}>
              <Typography variant="subtitle1">
                Blood Donation Is The Act Of Giving Blood To Someone Who Needs It. It Is Not Just About Giving Blood, But It Is An Act Of Kindness That Saves The Lives Of Hundreds Of People. These
                Fifteen Minutes Of Your Life Can Save Someone’s Entire Life.
              </Typography>
            </Box>
            <Button variant="contained" color="primary" className={classes.shoutButton} endIcon={<RecordVoiceOverRoundedIcon />} size="large" onClick={handleClickOpen}>
              Ask For Plasma
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1615461065624-21b562ee5566?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1496&q=80"
              alt="donate-plasma"
              width="100%"
              height="100%"
              className={classes.imgStyle}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mt={10} display="flex" justifyContent="center">
              <Typography variant="h4">Donor List</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Select Area</InputLabel>
                  <Select value={area} onChange={handleAreaLocation} label="Blood Group">
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
                <FormControl className={classes.formControl}>
                  <InputLabel>Blood Group</InputLabel>
                  <Select value={bloodGroup} onChange={handleBloodGroup} label="Blood Group">
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
                <Button variant="contained" color="primary" disableElevation className={classes.filterButton} size="small" endIcon={<FilterListRoundedIcon />} onClick={filterDonors}>
                  Filter
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <form onSubmit={handleSearch}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <TextField label="Search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button type="submit" variant="contained" color="primary" className={classes.filterButton} size="small" disableElevation endIcon={<SearchRoundedIcon />} onClick={handleSearch}>
                      Search
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {donorList.length !== 0 ? (
              <DonorList donorList={donorList} />
            ) : (
              <div className={classes.emptyLayout}>
                <Typography variant="h5">No result found for '{search}' </Typography>
              </div>
            )}
          </Grid>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          PaperProps={{
            style: { borderRadius: 16 },
          }}>
          <DialogTitle id="form-dialog-title">Ask for Plasma</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <DialogContentText style={{ fontWeight: 500 }}>
                This feature lets you to give a notification to selected donors based on their location and blood group. In this way, donors can be notified through the system.
              </DialogContentText>
              <TextField autoFocus margin="dense" label="Name" name="name" value={name} onChange={handleChange} required fullWidth variant="outlined" />
              <TextField margin="dense" label="Phone Number" name="phoneNumber" value={phoneNumber} onChange={handleChange} required fullWidth variant="outlined" />
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel>Select Area</InputLabel>
                <Select value={area} onChange={handleAreaLocation} label="Blood Group">
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
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel>Blood Group</InputLabel>
                <Select value={bloodGroup} onChange={handleBloodGroup} label="Blood Group">
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

              <small> N.B: Your name and phone number will be visible to the notified persons. </small>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" className={classes.confirmShoutButton}>
                Make Shout
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </div>
  );
}

export default Home;
