import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const Login = () => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post("/users/login", user);
      console.log(loginRes.data);
      setUser({ username: "", password: "" });
    } catch (err) {
      console.log(err);
      err.response.data.msg && setError(err.response.data.msg);
      setUser({ ...user, password: "" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.root}>
      <Typography variant="h5">Login</Typography>
      {error && (
        <Alert
          severity="error"
          variant="outlined"
          onClose={(e) => setError(undefined)}
        >
          {error}
        </Alert>
      )}
      <TextField
        required
        type="text"
        variant="outlined"
        label="Username"
        size="small"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className={classes.textfield}
      />

      <TextField
        required
        type="password"
        variant="outlined"
        label="Password"
        size="small"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className={classes.textfield}
      />

      <Button
        variant="contained"
        type="submit"
        size="medium"
        className={classes.button}
      >
        Login
      </Button>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      margin: "3rem auto",
      width: "40%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    [theme.breakpoints.down('sm')]:{
        margin: "3rem auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
  },
  textfield: {
    margin: "0.5rem auto",
    width: "60%",
  },
  button: {
    width: "40%",
    margin: "0.5rem auto",
  },
}));

export default Login;
