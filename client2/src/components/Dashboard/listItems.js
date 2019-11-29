import React from 'react';
import { useHistory } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import ConfigProduct from './Configs/ConfigProduct'
import ConfigUser from './Configs/ConfigUser'
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ListItems() {
  const classes = useStyles()

  const history = useHistory()

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenUser = () => {
    setOpen2(true)
  }
  const handleCloseUser = () => {
    setOpen2(false)
  }

  return (
    <div>
      <List>
        <ListItem button onClick={() => history.push('/home')}>
          <ListItemIcon>
            <Tooltip title="Dashboard" placement="right">
              <DashboardIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button onClick={() => history.push('/products')}>
          <ListItemIcon>
            <Tooltip title="Products" placement="right">
              <ShoppingCartIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>

        <ListItem button onClick={() => history.push('/users')}>
          <ListItemIcon>
            <Tooltip title="Users" placement="right">
              <PeopleIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Tooltip title="Activity Log" placement="right">
              <BarChartIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Activity Log" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <Tooltip title="Integrations" placement="right">
              <LayersIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader inset>Functions</ListSubheader>
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <Tooltip title="Add a Product" placement="right">
              <AddIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Add a Product" />
        </ListItem>
        <ListItem button onClick={handleOpenUser} >
          <ListItemIcon>
            <Tooltip title="Add User" placement="right">
              <PersonAddIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Tooltip title="Year-end sale" placement="right">
              <SettingsIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary="Year-end sale" />
        </ListItem>
      </List>

      <Modal
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
          <ConfigProduct />
        </Fade>
      </Modal>

      <Modal
        className={classes.modal}
        open={open2}
        onClose={handleCloseUser}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <ConfigUser />
        </Fade>
      </Modal>
    </div>
  )
}
