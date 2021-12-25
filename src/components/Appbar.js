import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

const Appbar = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // const logout = () => {
  //   localStorage.removeItem("loginData");
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("expiryDate");
  //   localStorage.removeItem("token");
  //   history.push("/login");
  // };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo List
          </Typography>
          <GoogleLogout
            clientId="771846533282-ea8m3ip5tk3um6bass6si6qaloj29011.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={() => props.logout(history)}
          ></GoogleLogout>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
