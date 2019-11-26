import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Title from './Title';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ListItems from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory()

  const [open, setOpen] = React.useState(false);

  const [prods, setProds] = useState([])
  const [users, setUsers] = useState([])
  const [showNotif, setShowNotif] = useState([])
  const [openin, setOpenin] = React.useState(false);

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const opened = Boolean(anchorEl);

  const [notif, setNotif] = useState(null);
  const openShow = Boolean(notif);

  const handleOpenNotif = event => {
    setNotif(event.currentTarget)
  }
  const handleCloseNotif = () => {
    setNotif(null)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenin = () => {
    setOpenin(true);
  };

  const handleClosein = () => {
    setOpenin(false);
  };

  const handlelogout = () => {
    handleOpenin()
    setTimeout(() => {
      history.push('/')
      localStorage.removeItem('token')
      handleClosein()
    }, 1000);
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const apiUrl = "http://localhost:3030/api/products/dashboard"
    axios.get(apiUrl, config)
      .then(res => {
        // console.log(res.data.data)
        setProds(res.data.data)

      })
      .catch(err => {
        console.log(err)
      })

    const usersUrl = "http://localhost:3030/api/users/dashboard"
    axios.get(usersUrl, config)
      .then(res => {
        // console.log(res.data.registered)
        setUsers(res.data.registered)

      })
      .catch(err => {
        console.log(err)
      })

    const notifUrl = "http://localhost:3030/api/notif"

    axios.get(notifUrl, config)
      .then(res => {
        // console.log(res.data.data)
        setShowNotif(res.data.data)

      })
      .catch(err => {
        console.log(err)
      })
  }, 1);

  const products = prods.map(prod => (
    <TableRow key={prod._id}>
      <TableCell>{prod.name}</TableCell>
      <TableCell>{prod.price}</TableCell>
      <TableCell>{prod.description}</TableCell>
      <TableCell>{prod.code}</TableCell>
    </TableRow>
  ))

  const usage = users.map(user => (
    <TableRow key={user._id}>
      <TableCell>{user.firstname}</TableCell>
      <TableCell>{user.lastname}</TableCell>
      <TableCell>{user.birthdate}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  ))

  const notificate = showNotif.map(notif => (
    <div>
      <MenuItem><b>{notif.title}</b></MenuItem>
    </div>
  ))

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNotif}
            color="inherit"
          >
            <Badge badgeContent={notificate.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={notif}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openShow}
            onClose={handleCloseNotif}
          >

            {notificate ? notificate : 'No notification available'}
          </Menu>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={opened}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
            <MenuItem onClick={handlelogout}>Logout</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListItems />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Users */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Registered Users</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Firstname</TableCell>
                      <TableCell>Lastname</TableCell>
                      <TableCell>Birthdate</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usage ? usage : 'No content available'}
                  </TableBody>
                </Table>
                <div className={classes.seeMore}>
                  <Link color="primary" href="/users">
                    See more users
                  </Link>
                </div>
              </Paper>
            </Grid>
            {/* Recent Products */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Title>Products</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Code</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products ? products : 'No content available'}
                  </TableBody>
                </Table>
                <div className={classes.seeMore}><br />
                  <Link color="primary" href="/products">
                    See more products
                  </Link>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openin}
          onClose={handleClosein}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openin}>
            <div className={classes.widy}>
              <center><CircularProgress /></center>
              <h3 id="transition-modal-description">Logging out...</h3>
            </div>
          </Fade>
        </Modal>
      </main>
    </div>
  );
}