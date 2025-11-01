import express from "express";
import {
  startConsultation,
  completeConsultation,
  getConsultationHistory
} from "../controllers/consultationController.js";
import authDoctor from "../middlewares/authDoctor.js";

const consultationRouter = express.Router();

consultationRouter.post("/start", authDoctor, startConsultation);
consultationRouter.post("/complete", authDoctor, completeConsultation);
consultationRouter.post("/history", getConsultationHistory);

export default consultationRouter;
