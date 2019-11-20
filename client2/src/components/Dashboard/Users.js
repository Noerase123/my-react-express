import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Users() {
  const classes = useStyles();
  
  const [users, setUsers] = useState([])

  useEffect(() => {
    const apiUrl = "http://localhost:3030/api/users/dashboard"
    axios.get(apiUrl)
      .then(res => {
        console.log(res.data.registered)
        setUsers(res.data.registered)

      })
      .catch(err => {
        console.log(err)
      })
  },1);


  const usage = users.map(user => (
    <TableRow key={user._id}>
      <TableCell>{user.firstname}</TableCell>
      <TableCell>{user.lastname}</TableCell>
      <TableCell>{user.birthdate}</TableCell>
      <TableCell>{user.email}</TableCell>
    </TableRow>
  ))

  return (
    <React.Fragment>
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
        <Link color="primary" href="javascript:;">
          See more users
        </Link>
      </div>
    </React.Fragment>
  );
}