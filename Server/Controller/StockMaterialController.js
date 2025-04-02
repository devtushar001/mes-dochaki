import StockModel from "../Models/StockModel.js";
import UserModel from "../Models/UserModel.js";
export const AddStockMaterialController = async (req, res) => {
    try {
        ;
        const { materialName, imageUrl, description, quantity, color } = req.body;
        const userData = await UserModel.findById(req.user);
        if (!userData || !userData.access || !userData.isVerified) {
            return res.status(404).json({
                success: false,
                message: `You are not authenticated user.`
            })
        }

        if (!userData || !userData.isVerified || !userData.access) {
            return res.status(400).json({
                success: false,
                message: `You have no access to edit these things.`
            })
        }

        if (!materialName) {
            return res.status(400).json({
                success: false,
                message: "Material name is required."
            });
        }

        if (quantity !== undefined && quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be negative."
            });
        }

        const newRawProduct = await StockModel.create({
            materialName,
            imageUrl: imageUrl || "https://surl.li/raobve",
            description,
            quantity,
            color
        });

        return res.status(201).json({
            success: true,
            message: "Raw material added successfully!",
            data: newRawProduct
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `API encountered an error: ${error.name} - ${error.message}`
        });
    }
};

export const getStockMaterialController = async (req, res) => {
    try {
        const searchQuery = req.query.query || "All";

        console.log("Search Query:", searchQuery);

        let filter = {};

        if (searchQuery !== "All") {
            filter = {
                $or: [
                    { materialName: { $regex: searchQuery, $options: "i" } },
                    { description: { $regex: searchQuery, $options: "i" } }
                ]
            };
        }

        const rawMaterials = await StockModel.find(filter);

        return res.status(200).json({
            success: true,
            message: rawMaterials.length > 0
                ? "Raw materials fetched successfully!"
                : "No raw materials found.",
            data: rawMaterials
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `API encountered an error: ${error.name} - ${error.message}`
        });
    }
};


export const deleteStockMaterialController = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await UserModel.findById(req.user);
        if (!userData || !userData.access || !userData.isVerified) {
            return res.status(404).json({
                success: false,
                message: `You are not authenticated user.`
            })
        }


        const deletedMaterial = await StockModel.findByIdAndDelete(id);


        if (!deletedMaterial) {
            return res.status(404).json({
                success: false,
                message: "Raw material not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Raw material deleted successfully!",
            data: deletedMaterial
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `API encountered an error: ${error.name} - ${error.message}`
        });
    }
};