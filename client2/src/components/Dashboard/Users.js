import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Title from './Title';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '200px'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Users() {
  const classes = useStyles();

  const [user, setUser] = useState([])
  const [view, setView] = useState({})
  const [update, setUpdate] = useState({})
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [updateid, setUpdateid] = useState('')

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [email, setEmail] = useState("")

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  const ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const birth = (birthdate) => {
    return birthdate.slice(0, 10)
  }

  useEffect(() => {
    const apiUrl = "http://localhost:3030/api/users/"
    axios.get(apiUrl)
      .then(res => {
        console.log(res.data.registered)
        setUser(res.data.registered)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const prodDelete = (prodid) => {
    const apiUrl = "http://localhost:3030/api/users/"
    if (window.confirm('Are you sure?')) {
      axios.delete(apiUrl + prodid)
        .then(res => {
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const prodView = (prodid) => {
    const apiUrl = "http://localhost:3030/api/users/"
    axios.get(apiUrl + prodid)
      .then(response => {
        console.log(response.data)
        setView(response.data)
        setOpen(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const prodUpdate = () => {
    const apiUrl = "http://localhost:3030/api/users/"
    const payload = [
      {
        "propName": "firstname",
        "value": firstname
      },
      {
        "propName": "lastname",
        "value": lastname
      },
      {
        "propName": "birthdate",
        "value": birthdate
      },
      {
        "propName": "email",
        "value": email
      }

    ]

    axios.patch(apiUrl + updateid, payload)
      .then(res => {
        console.log(res.data)
        alert(res.data.message)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }


  const updateProd = (updateid) => {
    setUpdateid(updateid);

    const apiUrl = "http://localhost:3030/api/users/"
    axios.get(apiUrl + updateid)
      .then(response => {
        console.log(response.data)
        setOpenupdate(true);
        setFirstname(response.data.firstname)
        setLastname(response.data.lastname)
        setBirthdate(response.data.birthdate)
        setEmail(response.data.email)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const PUpdate = () => {

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openupdate}
          onClose={handleCloseupdate}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 250,
          }}
        >
          <Fade in={openupdate}>
            <div className={classes.paper}>
              <Typography variant="h5" gutterBottom>
                Update Product
              </Typography>

              <TextField
                id="standard-full-width"
                label="Firstname"
                // style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                defaultValue={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
              <TextField
                id="standard-full-width"
                label="Lastname"
                // style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                defaultValue={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
              <TextField
                id="standard-full-width"
                label="Birthdate"
                // style={{ margin: 8 }}
                fullWidth
                margin="normal"
                type="date"
                variant="outlined"
                defaultValue={birthdate}
                onChange={(event) => setBirthdate(event.target.value)}

              />
              <TextField
                id="standard-full-width"
                label="Email"
                // style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                defaultValue={email}
                onChange={(event) => setEmail(event.target.value)}

              />
              <Fab color="primary" aria-label="add" onClick={() => prodUpdate()}>
                <AddIcon />
              </Fab>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }

  const PView = () => {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 250,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2>User Details</h2>
              <p style={pStyle}><b>Firstname :</b> {view.firstname}</p>
              <p style={pStyle}><b>Lastname :</b> {view.lastname}</p>
              <p style={pStyle}><b>Birtdate :</b> {view.birthdate}</p>
              <p style={pStyle}><b>Email :</b> {view.email}</p>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }

  const usage = user.map(usr => (
    <TableRow key={usr._id}>
      <TableCell>{ucfirst(usr.firstname)}</TableCell>
      <TableCell>{ucfirst(usr.lastname)}</TableCell>
      <TableCell>{birth(usr.birthdate)}</TableCell>
      <TableCell>{usr.email}</TableCell>

      <Button variant="contained" style={ViewStyle} className={classes.button} onClick={() => prodView(usr._id)}>
        View
      </Button>

      <Button variant="contained" color="primary" style={btnStyle} className={classes.button} onClick={() => updateProd(usr._id)}>
        Edit
      </Button>

      <Button variant="contained" color="secondary" className={classes.button} onClick={() => prodDelete(usr._id)}>
        Delete
      </Button>

    </TableRow>
  ))

  return (
    <React.Fragment>

      {PView()}
      {PUpdate()}

      <Title>Products</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Firstname</TableCell>
            <TableCell>Lastname</TableCell>
            <TableCell>BirthDate</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Options</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usage ? usage : 'No content available'}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}

const btnStyle = {
  margin: '10px'
}

const ViewStyle = {
  margin: '10px',
  color: '#fff',
  backgroundColor: 'green'
}

const pStyle = {
  fontSize: '18px'
}