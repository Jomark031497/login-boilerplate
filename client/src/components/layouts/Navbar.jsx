import React from "react";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory, Link } from "react-router-dom";

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to="/" className={classes.link}>
            Login Boilerplate
          </Link>
        </Typography>

        <div className={classes.buttons}>
          <Button
            onClick={() => history.push("/login")}
            className={classes.button}
          >
            Login
          </Button>
          <Button
            onClick={() => history.push("/register")}
            className={classes.button}
          >
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    flex: "1",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
  button: {
    color: "#fff",
  },
}));

export default Navbar;
