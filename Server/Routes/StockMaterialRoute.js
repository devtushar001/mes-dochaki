import express from 'express';
import { AddStockMaterialController, deleteStockMaterialController, getStockMaterialController } from '../Controller/StockMaterialController.js';

const StockMaterialRoute = express.Router();

StockMaterialRoute.post("/create", AddStockMaterialController);
StockMaterialRoute.get("/get", getStockMaterialController);
StockMaterialRoute.delete("/delete/:id", deleteStockMaterialController);

export default StockMaterialRoute;
