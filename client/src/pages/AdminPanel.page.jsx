import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tab, Tabs } from "@material-ui/core";
import PendingHospitalList from "../components/PendingHospitalList.component";
import ConfirmedHospitalList from "../components/ConfirmedHospitalList.component";
import TabPanel from "../components/TabPanel.component";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: "15px 25px",
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function AdminPanel() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.margin}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" centered aria-label="simple tabs example">
          <Tab label="Pending List" {...a11yProps(0)} />
          <Tab label="Confirmed List" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <PendingHospitalList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConfirmedHospitalList />
      </TabPanel>
    </div>
  );
}

export default AdminPanel;
