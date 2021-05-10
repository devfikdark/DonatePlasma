import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import empty from "../images/nodata.svg";

const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  const [loading, setLoading] = useState(false);
  const [pendingHospitals, setPendingHospitals] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/hospital/list", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setPendingHospitals(res.data.data.pendingList);
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <Grid container spacing={2} className={classes.layout}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : pendingHospitals.length !== 0 ? (
          <>
            {pendingHospitals.map((el) => (
              <Grid item xs={12} sm={8} key={el._id}>
                <Card className={classes.borderRadius}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box p={2}>
                          <Typography variant="h6">Hospital Name</Typography>
                          <Typography variant="subtitle1"> {el.name} </Typography>
                          <Typography variant="h6">Phone Number</Typography>
                          <Typography variant="subtitle1">{el.phone}</Typography>
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
                        <img src={el.documents} alt="hospital" height="100%" width="100%" />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <Box display="flex" justifyContent="center">
            <>
              <img src={empty} alt="empty" width="200" height="100%" />
              <Typography variant="h5">No pending hospitals</Typography>
            </>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default PendingHospitalList;
