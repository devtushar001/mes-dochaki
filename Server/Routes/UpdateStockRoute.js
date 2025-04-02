import express from 'express';
import { CreateUpdateStockController, GetUpdateStockController } from '../Controller/UpdateStockController.js';
import isAuth from '../Middlewares/isAuth.js';

const UpdateStockRoute = express.Router();

UpdateStockRoute.post("/update", isAuth, CreateUpdateStockController);
UpdateStockRoute.get("/get-update/:date", isAuth, GetUpdateStockController);

export default UpdateStockRoute;
