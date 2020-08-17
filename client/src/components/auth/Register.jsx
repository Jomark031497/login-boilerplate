import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const Register = () => {
  const classes = useStyles();
  const [error, setError] = useState();
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.passwordCheck) {
      setError("Password doesn't match ");
      return;
    }
    try {
      const newUser = {
        username: user.username,
        password: user.password,
      };

      const registerRes = await axios.post("/users/register", newUser);

      console.log(registerRes);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);

    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.root}>
      <Typography variant="h5">Register</Typography>
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

      <TextField
        required
        type="password"
        variant="outlined"
        label="Retype Password"
        size="small"
        value={user.passwordCheck}
        onChange={(e) => setUser({ ...user, passwordCheck: e.target.value })}
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

    [theme.breakpoints.down("sm")]: {
      margin: "3rem auto",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
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

export default Register;
