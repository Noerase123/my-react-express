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

export default function Products() {
  const classes = useStyles();

  const [prod, setProd] = useState([])
  const [view, setView] = useState({})
  const [update, setUpdate] = useState({})
  const [open, setOpen] = useState(false);
  const [openupdate, setOpenupdate] = useState(false);
  const [updateid, setUpdateid] = useState('')

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [desc, setDesc] = useState("")

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseupdate = () => {
    setOpenupdate(false);
  };

  useEffect(() => {
    const apiUrl = "http://localhost:3030/api/products/"
    axios.get(apiUrl)
      .then(res => {
        setProd(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const prodDelete = (prodid) => {
    const apiUrl = "http://localhost:3030/api/products/"
    if (window.confirm('Are you sure?')) {
      axios.delete(apiUrl + prodid)
        .then(res => {
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const prodView = (prodid) => {
    const apiUrl = "http://localhost:3030/api/products/"
    axios.get(apiUrl + prodid)
      .then(response => {
        setView(response.data)
        setOpen(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const prodUpdate = () => {
    const apiUrl = "http://localhost:3030/api/products/"
    const payload = [
      {
        "propName": "name",
        "value": name
      },
      {
        "propName": "price",
        "value": price
      },
      {
        "propName": "description",
        "value": desc
      }

    ]

    axios.patch(apiUrl + updateid, payload)
      .then(res => {
        alert(res.data.message)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }


  const updateProd = (updateid) => {
    setUpdateid(updateid);

    const apiUrl = "http://localhost:3030/api/products/"
    axios.get(apiUrl + updateid)
      .then(response => {
        setOpenupdate(true);
        setName(response.data.name)
        setPrice(response.data.price)
        setDesc(response.data.description)
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
                label="Name"
                // style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                id="standard-full-width"
                label="Price"
                type="number"
                // style={{ margin: 8 }}
                fullWidth
                margin="normal"
                variant="outlined"
                defaultValue={price}
                onChange={(event) => setPrice(event.target.value)}

              />
              <TextField
                id="standard-full-width"
                label="Description"
                // style={{ margin: 8 }}
                fullWidth
                multiline
                margin="normal"
                rows="4"
                variant="outlined"
                defaultValue={desc}
                onChange={(event) => setDesc(event.target.value)}

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
              <h2>Product Details</h2>
              <p style={pStyle}><b>Name :</b> {view.name}</p>
              <p style={pStyle}><b>Price :</b> {view.price}</p>
              <p style={pStyle}><b>Description :</b> {view.description}</p>
              <p style={pStyle}><b>Code :</b> {view.code}</p>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }

  const usage = prod.map(user => (
    <TableRow key={user._id}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.price}</TableCell>
      <TableCell>{user.description}</TableCell>
      <TableCell>{user.code}</TableCell>

      <Button variant="contained" style={ViewStyle} className={classes.button} onClick={() => prodView(user._id)}>
        View
      </Button>

      <Button variant="contained" color="primary" style={btnStyle} className={classes.button} onClick={() => updateProd(user._id)}>
        Edit
      </Button>

      <Button variant="contained" color="secondary" className={classes.button} onClick={() => prodDelete(user._id)}>
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
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Code</TableCell>
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