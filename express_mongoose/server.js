import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as userService from './service/userService.js'
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose
.connect(MONGO_URL)
.then(() => console.log('Connect to db'))
.catch((err) => console.log('Cant connect to DB\n',err));

const app = express();

app.use(express.json());


app.post('/users', userService.createUser);
app.get('/users', userService.getUsers);
app.get('/users/:id', userService.getUserById);
app.delete('/users/:id', userService.deleteUserById);

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Cant connect to port' + PORT,err);
    }
    console.log('Connect');
});