import React from "react";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  borderRadius: {
    borderRadius: 8,
  },
  buttonStyle: {
    marginRight: 8,
    color: "#fff",
  },
}));

const PendingHospitalList = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container component="main">
        <div className={classes.paper}>
          <Grid item xs={12} sm={8}>
            <Card className={classes.borderRadius}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box p={2}>
                      <Typography variant="h6">Hospital Name</Typography>
                      <Typography variant="subtitle1">Pen Pecific Hospital</Typography>
                      <Typography variant="h6">Phone Number</Typography>
                      <Typography variant="subtitle1">0185544652</Typography>
                      <Divider />
                      <Box mt={3}>
                        <Button variant="contained" color="primary" disableElevation className={classes.buttonStyle} size="small">
                          Confirm
                        </Button>
                        <Button variant="outlined" color="secondary" size="small">
                          Decline
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <img
                      src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80"
                      alt="hospital"
                      height="100%"
                      width="100%"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default PendingHospitalList;
