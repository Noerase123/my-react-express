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

export default function Products() {
  const classes = useStyles();
  
  const [users, setUsers] = useState([])

  useEffect(() => {
    const apiUrl = "http://localhost:3030/api/products"
    axios.get(apiUrl)
      .then(res => {
        console.log(res.data.data)
        setUsers(res.data.data)

      })
      .catch(err => {
        console.log(err)
      })
  },1);


  const usage = users.map(user => (
    <TableRow key={user._id}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.price}</TableCell>
      <TableCell>{user.description}</TableCell>
      <TableCell>{user.code}</TableCell>
    </TableRow>
  ))

  return (
    <React.Fragment>
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
          {usage ? usage : 'No content available'}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more products
        </Link>
      </div>
    </React.Fragment>
  );
}