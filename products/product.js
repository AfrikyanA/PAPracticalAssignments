import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Product', ProductsSchema);