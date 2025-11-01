import bookingModel from "../models/bookingModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid"; // for transaction ID

// 🟢 1. Create Booking (before payment)
const createBooking = async (req, res) => {
  try {
    const { userId, doctorId, consultationType, date, timeSlot } = req.body;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor || !doctor.verified || !doctor.listed)
      return res.json({ success: false, message: "Doctor not available" });

    const booking = new bookingModel({
      userId,
      doctorId,
      consultationType,
      date,
      timeSlot,
      fees: doctor.fees,
      paymentStatus: "pending"
    });

    await booking.save();

    res.json({ success: true, booking, message: "Booking initiated. Proceed to payment." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 2. Confirm Payment (dummy or Razorpay integration)
const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "paid",
        transactionId: uuidv4(),
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Payment successful! Appointment confirmed.",
      booking
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 3. Get User Bookings
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await bookingModel.find({ userId })
      .populate("doctorId", "name specialization fees location")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 4. Get Doctor Bookings
const getDoctorBookings = async (req, res) => {
  try {
    const { doctorId } = req.query;
    const bookings = await bookingModel.find({ doctorId })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// 🟢 5. Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await bookingModel.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );
    res.json({ success: true, message: "Booking cancelled", booking });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { createBooking, confirmPayment, getUserBookings, getDoctorBookings, cancelBooking };
