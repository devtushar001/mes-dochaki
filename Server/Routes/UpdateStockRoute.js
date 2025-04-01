import express from 'express';
import { CreateUpdateStockController, GetUpdateStockController } from '../Controller/UpdateStockController.js';

const UpdateStockRoute = express.Router();

UpdateStockRoute.post("/update", CreateUpdateStockController);
UpdateStockRoute.get("/get-update/:date", GetUpdateStockController);

export default UpdateStockRoute;
