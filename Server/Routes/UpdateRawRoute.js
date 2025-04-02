import express from 'express';
import { CreateUpdateRawController, GetUpdateRawController } from '../Controller/UpdateRawController.js';
import isAuth from '../Middlewares/isAuth.js';

const UpdateRawRoute = express.Router();

UpdateRawRoute.post("/update", isAuth, CreateUpdateRawController);
UpdateRawRoute.get("/get-update/:date", isAuth, GetUpdateRawController); 

export default UpdateRawRoute;
