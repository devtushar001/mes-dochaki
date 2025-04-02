import express from 'express';
import { AddStockMaterialController, deleteStockMaterialController, getStockMaterialController } from '../Controller/StockMaterialController.js';
import isAuth from '../Middlewares/isAuth.js';

const StockMaterialRoute = express.Router();

StockMaterialRoute.post("/create",isAuth, AddStockMaterialController);
StockMaterialRoute.get("/get",isAuth, getStockMaterialController);
StockMaterialRoute.delete("/delete/:id",isAuth, deleteStockMaterialController);

export default StockMaterialRoute;
