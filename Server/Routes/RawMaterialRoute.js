import express from 'express';
import {
    AddRawMaterialController,
    deleteRawMaterialController,
    getRawMaterialController
} from '../Controller/RawMaterialController.js';

const RawMaterialRouter = express.Router();

RawMaterialRouter.post("/create", AddRawMaterialController);
RawMaterialRouter.get("/get", getRawMaterialController); 
RawMaterialRouter.delete("/delete/:id", deleteRawMaterialController);

export default RawMaterialRouter;
