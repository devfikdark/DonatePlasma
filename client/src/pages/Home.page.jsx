import React from "react";
import { Box, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DonorList from "../components/DonorList.component";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  imgStyle: {
    borderRadius: 8,
    boxShadow: "14px 17px 14px -7px #A8A8A8",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  filterButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">Donate Plasma Save Life.</Typography>
            <Box mt={4}>
              <Typography variant="subtitle1">
                Blood Donation Is The Act Of Giving Blood To Someone Who Needs It. It Is Not Just About Giving Blood, But It Is An Act Of Kindness That Saves The Lives Of Hundreds Of People. These
                Fifteen Minutes Of Your Life Can Save Someone’s Entire Life.
              </Typography>
            </Box>
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
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" color="primary" disableElevation className={classes.filterButton} size="small">
                  Filter
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="flex-end" alignItems="center">
                  <TextField label="Search" />
                  <Button variant="contained" color="primary" className={classes.filterButton} size="small" disableElevation>
                    Search
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <DonorList />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
