import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
    {
        materialName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        imageUrl: {
            type: String,
            default: "https://res.cloudinary.com/ddiwvmwzg/image/upload/v1742300773/mern-uploads/horrbcetabmixipiok2i.jpg"
        },
        description: {
            type: String,
            default: "Description not available for this product."
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be an integer."
            }
        },
        color: {
            type: String,
            enum: ["Black", "White", "Red", "Blue", "Green", "Yellow"],
            default: "Black",
            trim: true
        }
    },
    { timestamps: true }
);

const StockModel = mongoose.models.StockMaterial || mongoose.model("StockMaterial", StockSchema);

export default StockModel;
