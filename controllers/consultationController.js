import consultationModel from "../models/consultationModel.js";
import emrModel from "../models/emrModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import generatePrescriptionPDF from "../utils/pdfGenerator.js";

// 🟢 1. Start Consultation
const startConsultation = async (req, res) => {
  try {
    const { bookingId, doctorId, userId, consultationType } = req.body;
    const consultation = new consultationModel({
      bookingId,
      doctorId,
      userId,
      consultationType,
      status: "in-progress"
    });
    await consultation.save();
    res.json({ success: true, consultation });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// 🟢 2. Complete Consultation and Generate Prescription
const completeConsultation = async (req, res) => {
  try {
    const { consultationId, diagnosis, prescription, advice } = req.body;
    const consultation = await consultationModel.findById(consultationId);
    if (!consultation) return res.json({ success: false, message: "Consultation not found" });

    consultation.diagnosis = diagnosis;
    consultation.prescription = prescription;
    consultation.advice = advice;
    consultation.status = "completed";
    consultation.endTime = new Date();
    await consultation.save();

    const doctor = await doctorModel.findById(consultation.doctorId);
    const user = await userModel.findById(consultation.userId);

    // Generate PDF
    const pdfPath = await generatePrescriptionPDF(doctor, user, consultation);

    // Save EMR
    const emr = new emrModel({
      bookingId: consultation.bookingId,
      doctorId: consultation.doctorId,
      userId: consultation.userId,
      diagnosis,
      prescription,
      advice
    });
    await emr.save();

    res.json({
      success: true,
      message: "Consultation completed successfully",
      pdfPath,
      emr
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// 🟢 3. Get Consultation History (for Doctor or User)
const getConsultationHistory = async (req, res) => {
  try {
    const { role, id } = req.body; // role = 'doctor' or 'user'
    const filter = role === "doctor" ? { doctorId: id } : { userId: id };
    const history = await consultationModel.find(filter)
      .populate("doctorId", "name specialization")
      .populate("userId", "name email")
      .sort({ startTime: -1 });
    res.json({ success: true, history });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { startConsultation, completeConsultation, getConsultationHistory };
