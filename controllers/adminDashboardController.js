import doctorModel from "../models/doctorModel.js";
import bookingModel from "../models/bookingModel.js";
import reviewModel from "../models/reviewModel.js";
import marketingModel from "../models/marketingModel.js";

// 🟢 1. Get Pending Doctor Applications
const getPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await doctorModel.find({ verified: false });
    res.json({ success: true, pendingDoctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 2. Approve / Reject Doctor
const updateDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) return res.json({ success: false, message: "Doctor not found" });

    doctor.verified = status === "approved";
    await doctor.save();

    res.json({
      success: true,
      message: `Doctor ${status === "approved" ? "approved" : "rejected"} successfully`
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 3. Payment & Commission Tracking
const getPaymentReport = async (req, res) => {
  try {
    const bookings = await bookingModel.find({ paymentStatus: "paid" })
      .populate("doctorId", "name")
      .populate("userId", "name");

    const totalRevenue = bookings.reduce((sum, b) => sum + b.fees, 0);
    const commission = totalRevenue * 0.2;
    const doctorPayouts = totalRevenue - commission;

    res.json({
      success: true,
      summary: {
        totalRevenue,
        commission,
        doctorPayouts,
        totalBookings: bookings.length
      },
      bookings
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 4. Reports & Analytics
const getAnalytics = async (req, res) => {
  try {
    const totalDoctors = await doctorModel.countDocuments();
    const totalBookings = await bookingModel.countDocuments();
    const totalReviews = await reviewModel.countDocuments();

    res.json({
      success: true,
      stats: {
        totalDoctors,
        totalBookings,
        totalReviews
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 5. Moderate Reviews
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.body;
    await reviewModel.findByIdAndDelete(reviewId);
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 6. Manage Promoted Profiles / Marketing Credits
const updateMarketingCredits = async (req, res) => {
  try {
    const { doctorId, credits } = req.body;

    let marketing = await marketingModel.findOne({ doctorId });
    if (!marketing) {
      marketing = new marketingModel({ doctorId, credits });
    } else {
      marketing.credits += credits;
    }

    marketing.expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await marketing.save();

    res.json({ success: true, message: "Credits updated successfully", marketing });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  getPendingDoctors,
  updateDoctorStatus,
  getPaymentReport,
  getAnalytics,
  deleteReview,
  updateMarketingCredits
};
