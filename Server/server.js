import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDb from './Config/connectDb.js';
import cloudinarySetup from './Config/CloudinarySetupConfig.js';
import imageRouter from './Routes/ImageUploaderRouter.js';
import RawMaterialRouter from './Routes/RawMaterialRoute.js';
import UpdateRawRoute from './Routes/UpdateRawRoute.js';
import StockMaterialRoute from './Routes/StockMaterialRoute.js';
import UpdateStockRoute from './Routes/UpdateStockRoute.js';
import cookieParser from 'cookie-parser';
import UserRouter from './Routes/UserRoute.js';

dotenv.config();
const cloudeName = process.env.CLOUDINARY_CLOUD_NAME, cloudApiKey = process.env.CLOUDINARY_API_KEY, cloudApiSecret = process.env.CLOUDINARY_API_SECRET, mongo_url = process.env.MONGODB_URL, port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


cloudinarySetup(cloudeName, cloudApiKey, cloudApiSecret);
connectDb(mongo_url);

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: `App running on port ${port}`
    });
});

app.use('/api/images', imageRouter);
app.use('/api/raw-material', RawMaterialRouter);
app.use('/api/update-raw', UpdateRawRoute);
app.use('/api/stock-material', StockMaterialRoute);
app.use('/api/stock-material-update', UpdateStockRoute);
app.use('/api/user', UserRouter);

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'Universal Something went wrong!',
        error: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
