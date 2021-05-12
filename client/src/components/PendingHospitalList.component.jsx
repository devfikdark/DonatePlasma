import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CircularProgress, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Notification from "./Notification.component";
import ImageZoom from "react-medium-image-zoom";
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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [pendingHospitals, setPendingHospitals] = useState([]);

  const fetchPendingHospitalList = () => {
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
  };

  useEffect(() => {
    fetchPendingHospitalList();
  }, []);

  const confirmHospital = (id) => {
    console.log(id);
    setConfirmLoading(true);
    axios
      .patch(
        `/hospital/profile/${id}/active`,
        { status: true },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        Notification("Success", "You've confirmed the hospital", "success");
        fetchPendingHospitalList();
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => setConfirmLoading(false));
  };

  const rejectHospital = (id) => {
    setRejectLoading(true);
    axios
      .patch(
        `/hospital/profile/${id}/cancel`,
        { isCancel: true },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        Notification("Warning", "You've rejected the hospital", "warning");
        fetchPendingHospitalList();
      })
      .catch((err) => {
        if (err.response.data.message) {
          Notification("Error", `${err.response.data.message}`, "error");
        } else {
          Notification("Error", "Something went wrong. Please check your internet connection", "error");
        }
      })
      .finally(() => setRejectLoading(false));
  };

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
                            <Button variant="contained" color="primary" disableElevation className={classes.buttonStyle} size="small" onClick={() => confirmHospital(el._id)} disabled={confirmLoading}>
                              {confirmLoading ? "Confirming..." : "Confirm"}
                            </Button>
                            <Button variant="outlined" color="secondary" size="small" disabled={rejectLoading} onClick={() => rejectHospital(el._id)}>
                              {rejectLoading ? "Rejecting..." : "Reject"}
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <ImageZoom
                          image={{
                            src: el.documents,
                            alt: "hospital",
                            className: "img",
                            style: { width: "100%", height: "100%" },
                          }}
                          zoomImage={{
                            src: el.documents,
                            alt: "hospital",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </>
        ) : (
          <Box display="flex" justifyContent="center">
            <Grid container>
              <Grid item xs={12}>
                <img src={empty} alt="empty" width="200" height="100%" />
                <Box display="flex" justifyContent="center">
                  <Typography variant="h5">No pending hospitals</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
    </div>
  );
};

export default PendingHospitalList;
