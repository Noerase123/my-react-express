import React from 'react';
import { useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Axios from 'axios';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const history = useHistory()
  
  const [deps, setDeps] = React.useState(0)

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    Axios.get('http://localhost:3030/api/products/sumprice', {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data.sum)
        setDeps(res.data.sum)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <React.Fragment>
      <Title>Total Revenue</Title>
      <Typography component="p" variant="h4">
        ${deps}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        as of 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="javascript:;" onClick={() => history.push('/home')}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}