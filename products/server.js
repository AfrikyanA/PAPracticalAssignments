import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Product from './product.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose
.connect(MONGO_URL)
.then(() => console.log('Connect to db'))
.catch((err) => console.log('Cant connect to DB\n',err));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const handleError = (res, message, code = 500) => {
    console.error(message);
    res.status(code).json({ message: message });
};

app.get('/products', async (req, res) => {
    try{
        const products = await Product.find();
        if (!products.length) {
            return handleError(res, 'Productss not found', 404);
        }
        res.status(200).json({ products });
    }
    catch (err) {
        handleError(res, 'Failed to fetch productss');
    }
});

app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    try {
        const newProduct = new Product({ name, price });
        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', user: newProduct });
    }
    catch (err) {
        handleError(res, 'Failed to save product');
    }
});

app.listen(PORT, (err) => {
    if (err) {
        return console.log('Cant connect to port' + PORT,err);
    }
    console.log('Connect');
});