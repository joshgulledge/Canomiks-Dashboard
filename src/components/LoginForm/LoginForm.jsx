import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function LoginForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  /* Store Imports */
  const errors = useSelector((store) => store.errors);

  /* Local State */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          email,
          password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className={classes.root} onSubmit={login}>
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: 550 }}
        gutterBottom
      >
        Login
      </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <center>
        <div>
          <TextField
            variant="outlined"
            label="Email"
            size="small"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <TextField
            variant="outlined"
            label="Password"
            size="small"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div>
          <Button
            type="submit"
            style={{ backgroundColor: '#1e565c', color: 'white', margin: 10 }}
            name="login"
            value="Log In"
          >
            Login
          </Button>
        </div>
      </center>
    </form>
  );
}

export default LoginForm;
