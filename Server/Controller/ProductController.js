import ProductModel from "../Models/ProductsModel.js";

const createProductController = async (req, res) => {
    try {
        const { name, description, price, image, color, stock, unit } = req.body;

        if (!name || !description || !price || !image || !unit) {
            return res.status(400).json({
                success: false,
                message: "Some fields are required",
            });
        }

        const newProduct = await ProductModel.create({
            name,
            description,
            price,
            image,
            color,
            stock: stock || 0, 
            unit,
        });

        return res.status(201).json({
            success: true,
            message: "Product Added.",
            product: newProduct, 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default createProductController;