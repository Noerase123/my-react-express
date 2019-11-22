import React from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import axios from 'axios'

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ConfigUser() {
    const classes = useStyles();
    const history = useHistory()

    const [firstname, setFirstname] = React.useState('')
    const [lastname, setLastname] = React.useState('')
    const [birthdate, setBirthdate] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = () => {
        const apiUrl = 'http://localhost:3030/api/'
        const payload = {
            "firstname" : firstname,
            "lastname" : lastname,
            "birthdate" : birthdate,
            "email" : email,
            "password" : password
        }
        axios.post(apiUrl + 'users/', payload)
          .then(res => {
              console.log(res)
              console.log(res.data)
              alert(res.data.message)
              window.location.reload()
          })
          .catch(err => {
              console.log(err)
          })
    }

    return (
        <Card className={classes.card} style={cardStyle}>
            <CardContent style={cardContent}>
                <Typography variant="h5" gutterBottom>
                    Add User
                </Typography>

                <TextField
                    id="standard-full-width"
                    label="Firstname"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => setFirstname(event.target.value)}
                />
                <TextField
                    id="standard-full-width"
                    label="Lastname"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => setLastname(event.target.value)}
                />
                <TextField
                    id="standard-full-width"
                    label="Birthdate"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="date"
                    onChange={(event) => setBirthdate(event.target.value)}
                />
                <TextField
                    id="standard-full-width"
                    label="Email"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    id="standard-full-width"
                    label="Password"
                    style={{ margin: 8 }}
                    fullWidth
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </CardContent>
            <Fab color="primary" aria-label="add" style={submitStyle} className={classes.fab} onClick={() => handleSubmit()}>
                <AddIcon />
            </Fab>
        </Card>
    );
}

const submitStyle = {
    float: 'Right',
    margin: '20px'
}

const formStyle = {
    margin: '0px 400px'
  }

const cardStyle = {
    marginLeft: '10px'
}

const cardContent = {
    paddingRight: '40px'
}