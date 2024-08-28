const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser =  require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const handleError = (res, message, code = 500) => {
    console.error(message);
    res.status(code).json({ message: message });
};

const client = new MongoClient('mongodb://127.0.0.1:27017');
client.connect();
console.log('Connect to db');
const products = client.db('ashotdb').collection('products');

app.get('/products', async (req, res) => {
    try{
        const productList =  await products.find({}).toArray();
        res.status(200).json({ productList });
    }
    catch (err) {
        handleError(res, 'Failed to fetch products');
    }
});

app.post('/products', async (req, res) => {
    const { name, price } = req.body;
    try {
        const newProduct = await products.insertOne({ name, price });
        res.status(201).json({ message: 'Product created successfully', user: newProduct });
    }
    catch (err) {
        handleError(res, 'Failed to save product');
    }
});

app.listen(4444, (err) => {
    if (err) {
        return console.log('Cant connect to port' + PORT,err);
    }
    console.log('Connect');
}); 