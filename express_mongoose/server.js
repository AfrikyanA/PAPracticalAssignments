import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import User from './model/user.js';

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose
.connect(MONGO_URL)
.then(() => console.log('Connect to db'))
.catch((err) => console.log('Cant connect to DB\n',err));

const app = express();

app.use(express.json());


app.post('/users', async (req, res) => {
    try {
        const {name, email, age} = req.body;

        const newUser = new User({
            name,
            email,
            age
        });

        if (!name || !email || !age) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Failed to save user' });
    }
});

app.get('/users', async (req, res) => {
    try{
        const users = await User.find();
        if (!users) {
            return res.status(404).json({ error: 'Users not found' });
        }
        res.status(200).json({users});
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({user});
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Cant connect to port' + PORT,err);
    }
    console.log('Connect');
});