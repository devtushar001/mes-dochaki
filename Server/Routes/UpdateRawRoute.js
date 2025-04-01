import express from 'express';
import { CreateUpdateRawController, GetUpdateRawController } from '../Controller/UpdateRawController.js';

const UpdateRawRoute = express.Router();

UpdateRawRoute.post("/update", CreateUpdateRawController);
UpdateRawRoute.get("/get-update/:date", GetUpdateRawController); 

export default UpdateRawRoute;
