import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["raw", "in_stock", "out_of_stock"]
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "Unknown"
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    unit: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProductModel = mongoose.modelNames().includes("Products")
    ? mongoose.model("Products")
    : mongoose.model("Products", ProductSchema);

export default ProductModel;
