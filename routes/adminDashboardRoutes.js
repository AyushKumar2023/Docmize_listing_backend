import express from "express";
import {
  getPendingDoctors,
  updateDoctorStatus,
  getPaymentReport,
  getAnalytics,
  deleteReview,
  updateMarketingCredits
} from "../controllers/adminDashboardController.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminDashboardRouter = express.Router();

// Doctor verification
adminDashboardRouter.get("/doctors/pending", authAdmin, getPendingDoctors);
adminDashboardRouter.post("/doctors/update-status", authAdmin, updateDoctorStatus);

// Payments and reports
adminDashboardRouter.get("/payments", authAdmin, getPaymentReport);
adminDashboardRouter.get("/analytics", authAdmin, getAnalytics);

// Reviews moderation
adminDashboardRouter.delete("/reviews/delete", authAdmin, deleteReview);

// Marketing / promotions
adminDashboardRouter.post("/marketing/update-credits", authAdmin, updateMarketingCredits);

export default adminDashboardRouter;
