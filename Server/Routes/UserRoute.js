import express from 'express';
import { GetAllUserController, GetUserDetailsController, SendUserOtpController, UserAccessController, UserDeleteController, UserLoginController, UserOTPVerifyController, UserRegistrationController, VerifyOtpController } from '../Controller/UserController.js';
import isAuth from '../Middlewares/isAuth.js';

const UserRouter = express.Router();

UserRouter.post('/create', SendUserOtpController);
UserRouter.post('/register', UserRegistrationController);
UserRouter.post('/login', UserLoginController);
UserRouter.post('/verify-otp', isAuth, UserOTPVerifyController);
UserRouter.post('/verify', isAuth, VerifyOtpController);
UserRouter.get('/get-user', isAuth, GetUserDetailsController);
UserRouter.get('/all-users', isAuth, GetAllUserController);
UserRouter.post('/access', isAuth, UserAccessController);
UserRouter.post('/delete', isAuth, UserDeleteController);

export default UserRouter;