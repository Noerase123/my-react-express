import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  widy: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function App() {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailErr, setEmailErr] = useState('')
  const [pwErr, setPwErr] = useState('')

  const [open, setOpen] = React.useState(false);
  const [icon, setIcon] = useState(false)

  const history = useHistory()

  const handleSubmit = () => {
    const apiUrl = 'http://localhost:3030/api/'
    // console.log("values", email, password)
    const payload = {
      "email": email,
      "password": password
    }
    if (email === "") {
      setEmailErr("the email is empty")
    }
    else if (password === "") {
      setPwErr("the password is empty")
    }
    else {
      axios.post(apiUrl + 'users/login', payload)
        .then(response => {
          // console.log(response)
          localStorage.setItem("token", response.data.token)
          if (response.data.token !== "") {
            setIcon(true)
            setTimeout(() => {
              history.push('/home')
            }, 2000);
          }
        })
        .catch(err => {
          console.log(err)
          handleOpen()
        })
    }
  }

  const iconic = () => {
    if (icon == 1) {
      return (
        <CircularProgress />
      )
    } else {
      return
    }
  }

  const handlesignup = () => {
    history.push('/signup')
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          helperText={emailErr}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={event => setEmail(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          helperText={pwErr}
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={event => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Sign In
          </Button>
        {iconic}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
              </Link>
          </Grid>
          <Grid item>
            <Link onClick={handlesignup} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.widy}>
            <h2 id="transition-modal-title">
              <ErrorOutlineIcon /> Error</h2>
            <h3 id="transition-modal-description">Incorrect Username or Password</h3>
          </div>
        </Fade>
      </Modal>
    </Container>

  );
}