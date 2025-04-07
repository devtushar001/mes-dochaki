import express from 'express';
import {
    AddRawMaterialController,
    deleteRawMaterialController,
    getRawMaterialController,
    updateRawMaterialController
} from '../Controller/RawMaterialController.js';
import isAuth from '../Middlewares/isAuth.js';

const RawMaterialRouter = express.Router();

RawMaterialRouter.post("/create", isAuth, AddRawMaterialController);
RawMaterialRouter.post("/update", isAuth, updateRawMaterialController)
RawMaterialRouter.get("/get", isAuth, getRawMaterialController);
RawMaterialRouter.delete("/delete/:id", isAuth, deleteRawMaterialController);

export default RawMaterialRouter;
