import express from 'express';
import { AddStockMaterialController, deleteStockMaterialController, getStockMaterialController, updateStockMaterialController } from '../Controller/StockMaterialController.js';
import isAuth from '../Middlewares/isAuth.js';

const StockMaterialRoute = express.Router();

StockMaterialRoute.post("/create",isAuth, AddStockMaterialController);
StockMaterialRoute.post("/update",isAuth, updateStockMaterialController);
StockMaterialRoute.get("/get",isAuth, getStockMaterialController);
StockMaterialRoute.delete("/delete/:id",isAuth, deleteStockMaterialController);

export default StockMaterialRoute;
