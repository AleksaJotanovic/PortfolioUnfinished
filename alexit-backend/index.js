import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import categoryRoute from './routes/category.js';
import productRoute from './routes/product.js';
import userRoute from './routes/user.js';
import orderRoute from './routes/order.js';
import courierRoute from './routes/courier.js';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import saleRoute from './routes/sale.js';
import viewsRoute from './routes/view.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use(express.static(__dirname + '/public'));



//---------------Rute---------------------------------------
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);
app.use('/api/courier', courierRoute);
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/sales', saleRoute);
app.use('/api/view', viewsRoute)
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";
    return res.status(Number(statusCode)).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    });
});



const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGODB SAYS: -- Connected to Database! --");
    } catch (error) {
        throw error;
    }
};
app.listen(3000, () => {
    connectMongoDB();
    console.log('ALEXIT BACKEND SAYS: Connected! -- http://localhost:3000/ --');
});