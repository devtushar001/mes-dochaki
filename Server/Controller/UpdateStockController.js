import StockModel from "../Models/StockModel.js";
import UpdateStockModel from "../Models/UpdateStockModel.js";
import UserModel from "../Models/UserModel.js";

export const CreateUpdateStockController = async (req, res) => {
    try {

        let { ProductId, changeType, quantity, saleType, message } = req.body;
        const userData = await UserModel.findById(req.user);
        if (!userData || !userData.access || !userData.isVerified) {
            return res.status(404).json({
                success: false,
                message: `You are not authenticated user.`
            })
        }
        if (!ProductId || !changeType || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        changeType = changeType.toLowerCase().trim();
        quantity = Number(quantity);

        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a valid positive number"
            });
        }

        const rawProduct = await StockModel.findById(ProductId);
        if (!rawProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (changeType === "in") {
            rawProduct.quantity += quantity;
        } else if (changeType === "out") {
            if (rawProduct.quantity < quantity) {
                return res.status(400).json({
                    success: false,
                    message: "Not enough stock available"
                });
            }
            rawProduct.quantity -= quantity;
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid changeType. Use 'in' or 'out'."
            });
        }

        await rawProduct.save();

        const updateRaw = await UpdateStockModel.create({
            ProductData: {
                productId: rawProduct._id,
                name: rawProduct.materialName,
                image: rawProduct.imageUrl || "https://surl.li/raobve"
            },
            changeType,
            saleType,
            message,
            currentQuantity: rawProduct.quantity,
            quantity
        });

        if (!updateRaw) {
            return res.status(400).json({
                success: false,
                message: "Update operation failed."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product quantity updated successfully",
            updatedProduct: rawProduct
        });

    } catch (error) {
        console.log(error.name + ":" + error.message)
        return res.status(500).json({
            success: false,
            message: "API encountered an internal error",
            error: error.message
        });
    }
};

export const GetUpdateStockController = async (req, res) => {
    try {
        const { date } = req.params;
        console.log("Requested Date:", date);

        if (!date) {
            return res.status(400).json({
                success: false,
                message: "Date parameter is required"
            });
        }

        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);

        const getUpdatedData = await UpdateStockModel.find({
            createdAt: { $gte: startDate, $lt: endDate }
        }).sort({ createdAt: -1 });

        if (getUpdatedData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No updates found for the given date"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched updates for the given date",
            data: getUpdatedData
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "API encountered an internal error",
            error: error.message
        });
    }
};
