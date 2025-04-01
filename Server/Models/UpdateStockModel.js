import mongoose from "mongoose";

const ProductDataSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            index: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    { _id: false }
);

const UpdateStockSchema = new mongoose.Schema(
    {
        ProductData: {
            type: ProductDataSchema,
            required: true
        },
        changeType: {
            type: String,
            enum: ["in", "out"],
            required: true
        },
        currentQuantity: {
            type: Number,
            required: true,
            min: 0
        },
        saleType: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    { timestamps: true }
);

const UpdateStockModel = mongoose.models.UpdateStock || mongoose.model("UpdateStock", UpdateStockSchema);

export default UpdateStockModel;

