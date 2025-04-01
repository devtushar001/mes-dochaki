import mongoose from "mongoose";

const OutSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    item: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const outeModel = mongoose.models.Order || mongoose.model("Order", OutSchema);