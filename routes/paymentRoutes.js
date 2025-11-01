import express from "express";
import { processPayment, processPayout, getDoctorRevenue } from "../controllers/paymentController.js";
import authDoctor from "../middlewares/authDoctor.js";
import authAdmin from "../middlewares/authAdmin.js";

const paymentRouter = express.Router();

paymentRouter.post("/process", processPayment);
paymentRouter.post("/payout/process", authAdmin, processPayout);
paymentRouter.post("/doctor/revenue", authDoctor, getDoctorRevenue);

export default paymentRouter;
