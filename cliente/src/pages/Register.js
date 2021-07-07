import React, { useState } from 'react';
import { Button, FormControl, Grid, Input, InputLabel, makeStyles, Paper, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";

const URL = "http://localhost:3006/api/users";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  inputText: {
    width:'20vw'
  }
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const {username, password} = user;

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(URL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(data => {
      alert("Registrado correctamente!.");
      history.push('/login');
    })
    .catch(err => {
      alert("La contraseña debe tener como minimo 6 caracteres.");
    });
  }

  return (
    <Grid container justify="center" alignItems="center" style={{"height": "85vh"}}>
      <Paper elevation={3} style={{padding: "3rem"}}>
        <Grid container justify="center" style={{marginBottom: "2rem"}}>
          <Typography variant="h4"> Registro de usuario</Typography>
        </Grid>
        <form  autoComplete="off" onSubmit={handleSubmit} style={{"width": "22vw"}}>
          <Grid container direction="column">
            <Grid item>
              <FormControl required className={classes.root}>
                <InputLabel htmlFor="username">Nombre de usuario</InputLabel>
                <Input id="username" name="username" type="text" className={classes.inputText} value={username} onChange={handleChange}/>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl required className={classes.root}>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input id="password" name="password" type="password" className={classes.inputText} value={password} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid container justify="flex-end">
              <FormControl className={classes.root}>
                <Button id="submit" name="submit" type="submit" variant="contained" color="primary" >
                  Registrarme
                </Button>
                <br/>
                <Button color="primary" href="/login" >
                  Volver
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default Register;