import express from "express";
import {
  createBooking,
  confirmPayment,
  getUserBookings,
  getDoctorBookings,
  cancelBooking
} from "../controllers/bookingController.js";
import authUser from "../middlewares/authUser.js";
import authAdmin from "../middlewares/authAdmin.js";

const bookingRouter = express.Router();

// User routes
bookingRouter.post("/create", authUser, createBooking);
bookingRouter.post("/confirm-payment", authUser, confirmPayment);
bookingRouter.get("/user", authUser, getUserBookings);
bookingRouter.post("/cancel", authUser, cancelBooking);

// Doctor/Admin route
bookingRouter.get("/doctor", authAdmin, getDoctorBookings);

export default bookingRouter;
