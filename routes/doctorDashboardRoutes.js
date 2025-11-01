import express from "express";
import {
  getAppointments,
  addEMR,
  getDoctorEMRs,
  addCRMEntry,
  getRevenueReport,
  getDoctorReviews
} from "../controllers/doctorDashboardController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorDashboardRouter = express.Router();

// Appointments
doctorDashboardRouter.get("/appointments", authDoctor, getAppointments);

// EMR
doctorDashboardRouter.post("/emr/add", authDoctor, addEMR);
doctorDashboardRouter.get("/emr/list", authDoctor, getDoctorEMRs);

// CRM
doctorDashboardRouter.post("/crm/add", authDoctor, addCRMEntry);

// Revenue
doctorDashboardRouter.get("/revenue", authDoctor, getRevenueReport);

// Reviews
doctorDashboardRouter.get("/reviews", authDoctor, getDoctorReviews);

export default doctorDashboardRouter;
