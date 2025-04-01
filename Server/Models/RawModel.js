import mongoose from "mongoose";

const RawSchema = new mongoose.Schema(
    {
        materialName: {
            type: String,
            required: true,
            trim: true
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
            min: 0
        },
        color: {
            type: String,
            default: "Black",
            trim: true
        }
    },
    { timestamps: true }
);

const RawModel = mongoose.models.RawMaterial || mongoose.model("RawMaterial", RawSchema);

export default RawModel;
