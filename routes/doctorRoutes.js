import express from "express";
import {
  applyDoctor,
  verifyDoctor,
  rejectDoctor,
  addMarketingCredits,
  getAllDoctors,
  searchDoctors,
  getDoctorById
} from "../controllers/doctorController.js";
import authAdmin from "../middlewares/authAdmin.js";

const doctorRouter = express.Router();

// Public route
doctorRouter.post("/apply", applyDoctor);
doctorRouter.get("/search", searchDoctors);
doctorRouter.get("/:id", getDoctorById);

// Admin-only routes
doctorRouter.post("/verify", authAdmin, verifyDoctor);
doctorRouter.post("/reject", authAdmin, rejectDoctor);
doctorRouter.post("/add-credits", authAdmin, addMarketingCredits);
doctorRouter.get("/all", authAdmin, getAllDoctors);

export default doctorRouter;
