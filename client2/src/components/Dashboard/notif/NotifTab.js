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
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios'

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ListItems from '../listItems';
import AddProductModal from '../Configs/AddProductModal'

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

export default function NotifTab() {
    const classes = useStyles();
    const history = useHistory()

    const [open, setOpen] = React.useState(false);
    const [showNotif, setShowNotif] = useState([])
    const [viewNotif, setViewnotif] = useState({})

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const opened = Boolean(anchorEl);


    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlelogout = () => {
        history.push('/')
    }

    useEffect(() => {
        const notifUrl = "http://localhost:3030/api/notif"
        const token = localStorage.getItem('token')
        axios.get(notifUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data.data)
                setShowNotif(res.data.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const notifView = (id) => {
        const token = localStorage.getItem('token')
        const apiUrl = 'http://localhost:3030/api/notif/';
        axios.get(apiUrl + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                setViewnotif(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const notifDelete = (id) => {
        const token = localStorage.getItem('token')
        const apiUrl = 'http://localhost:3030/api/notif/';
        axios.delete(apiUrl + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (window.confirm("are you sure?")) {
                    setTimeout(() => {
                        window.location.reload()
                    }, 500);
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    

    const notifMap = showNotif.map(notif => (
        <TableRow key={notif._id}>
            <TableCell>{notif.title}</TableCell>
            <TableCell>{notif.time}</TableCell>
            <TableCell>{notif.description}</TableCell>
            <TableCell><img src={notif.image} /></TableCell>

            <Button variant="contained" style={ViewStyle} className={classes.button} onClick={() => notifView(notif._id)}>
                View
          </Button>

            <Button variant="contained" color="secondary" className={classes.button} onClick={() => notifDelete(notif._id)}>
                Delete
          </Button>

        </TableRow>
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
                        Notifications
                    </Typography>

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
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" onClick={() => history.push('/home')}>
                                    Dashboard
                                </Link>
                                <Typography color="textPrimary">Notifications</Typography>
                            </Breadcrumbs>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <h2>Notifications</h2>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Time</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Options</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {notifMap ? notifMap : 'No content available'}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Copyright />
            </main>
        </div>
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