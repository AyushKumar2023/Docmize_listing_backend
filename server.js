import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mogodb.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import doctorDashboardRouter from './routes/doctorDashboardRoutes.js';
import adminDashboardRouter from './routes/adminDashboardRoutes.js';
import consultationRouter from './routes/consultationRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';

connectDB();


const app=express()
const PORT=process.env.PORT || 4000

app.use(cors())
app.use(express.json())


app.get('/',(req, res)=>{
    res.send("api is working")
})

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user', userRouter);
app.use('/api/booking', bookingRouter);
app.use("/api/doctor-dashboard", doctorDashboardRouter)
app.use("/api/admin-dashboard", adminDashboardRouter);
app.use("/api/consultation", consultationRouter);
app.use("/api/payment", paymentRouter);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})