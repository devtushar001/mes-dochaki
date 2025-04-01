import RawModel from "../Models/RawModel.js";

export const AddRawMaterialController = async (req, res) => {
    try {
        const { materialName, imageUrl, description, quantity, color } = req.body;
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

        const newRawProduct = await RawModel.create({
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

export const getRawMaterialController = async (req, res) => {
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

        const rawMaterials = await RawModel.find(filter);

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


export const deleteRawMaterialController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMaterial = await RawModel.findByIdAndDelete(id);

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