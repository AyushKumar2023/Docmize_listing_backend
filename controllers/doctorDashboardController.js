import bookingModel from "../models/bookingModel.js";
import emrModel from "../models/emrModel.js";
import crmModel from "../models/crmModel.js";
import reviewModel from "../models/reviewModel.js";

// 🟢 1. View Appointments
const getAppointments = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const appointments = await bookingModel
      .find({ doctorId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 2. Add EMR record
const addEMR = async (req, res) => {
  try {
    const { bookingId, doctorId, userId, diagnosis, prescription, advice } = req.body;

    const emr = new emrModel({ bookingId, doctorId, userId, diagnosis, prescription, advice });
    await emr.save();

    res.json({ success: true, message: "EMR saved successfully", emr });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 3. Get EMR for a Doctor
const getDoctorEMRs = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const emrs = await emrModel.find({ doctorId }).populate("userId", "name email");
    res.json({ success: true, emrs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 4. CRM Management (Add Lead/Inquiry)
const addCRMEntry = async (req, res) => {
  try {
    const { doctorId, type, name, email, phone, message, followUpDate } = req.body;
    const crm = new crmModel({ doctorId, type, name, email, phone, message, followUpDate });
    await crm.save();
    res.json({ success: true, message: "CRM entry added", crm });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 5. Revenue Report
const getRevenueReport = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const bookings = await bookingModel.find({ doctorId, paymentStatus: "paid" });
    const totalEarnings = bookings.reduce((sum, b) => sum + b.fees, 0);
    const commission = totalEarnings * 0.2; // 20% commission
    const payout = totalEarnings - commission;

    res.json({
      success: true,
      report: {
        totalBookings: bookings.length,
        totalEarnings,
        commission,
        payout,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 6. Ratings & Reviews
const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const reviews = await reviewModel.find({ doctorId }).populate("userId", "name");
    res.json({ success: true, reviews });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  getAppointments,
  addEMR,
  getDoctorEMRs,
  addCRMEntry,
  getRevenueReport,
  getDoctorReviews
};
