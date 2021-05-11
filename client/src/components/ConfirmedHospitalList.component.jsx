import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import empty from "../images/nodata.svg";
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  layout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function ConfirmedHospitalList() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [confirmedHospitals, setConfirmedHospitals] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/hospital/list", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data.confirmedList);
        setConfirmedHospitals(res.data.data.confirmedList);
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
    <Grid container className={classes.layout}>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : confirmedHospitals.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name </TableCell>
                <TableCell> Number of Donors</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {confirmedHospitals.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.donerCount}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  );
}
