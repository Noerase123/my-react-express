import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import axios from 'axios'
import cryptoRandomString from 'crypto-random-string';
import ImageUploader from 'react-images-upload'

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    input: {
        display: 'none',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ConfigProduct() {
    const classes = useStyles();
    const history = useHistory()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [desc, setDesc] = useState('')

    const [inc, setInc] = useState('')
    const [pictures, setPictures] = useState([])

    const token = localStorage.getItem('token')

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'multipart/form-data'
        }
    }



    const addProduct = () => {
        const url = 'http://localhost:3030/api/products/'

        const data = new FormData()
        data.append('name', name)
        data.append('price', price)
        data.append('description', desc)
        data.append('code', cryptoRandomString({ length: 10 }))
            data.append('productImage', pictures, pictures.name)

        if (name === "" || price === "" || desc === "") {
            setInc("You have incomplete form")
        } else {
            axios.post(url, data, config)
                .then(res => {
                    // console.log(res.data)
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                    console.log(pictures)
                })
        }
    }

    const onDrop = (picture) => {
        setPictures(picture[0])
    }

    return (
        <Card className={classes.card} style={cardStyle}>
            <CardContent style={cardContent}>
                <Typography variant="h5" gutterBottom>
                    Add Product
                </Typography>

                <h2 style={{ color: "red" }}>{inc}</h2>

                <TextField
                    id="standard-full-width"
                    label="Name"
                    // style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    variant="outlined"
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
                    onChange={(event) => setPrice(event.target.value)}

                />
                <ImageUploader
                    withIcon={false}
                    withPreview={true}
                    type="file"
                    label=""
                    buttonText="Upload Images"
                    onChange={onDrop}
                    imgExtension={[".jpeg", ".jpg", ".gif", ".png", ".gif", ".svg"]}
                    maxFileSize={1048576}
                    fileSizeError=" file size is too big"
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
                    onChange={(event) => setDesc(event.target.value)}

                />
            </CardContent>
            <Fab color="primary" aria-label="add" style={submitStyle} className={classes.fab} onClick={() => addProduct()}>
                <AddIcon />
            </Fab>
        </Card>
    );
}

const submitStyle = {
    float: 'Right',
    margin: '20px'
}

const cardStyle = {
    marginLeft: '10px'
}

const cardContent = {
    paddingRight: '40px'
}