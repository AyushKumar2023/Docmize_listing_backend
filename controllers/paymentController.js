import transactionModel from "../models/transactionModel.js";
import payoutModel from "../models/payoutModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import generateInvoice from "../utils/invoiceGenerator.js";

// 🟢 1. Process Payment (Simulated)
const processPayment = async (req, res) => {
  try {
    const { bookingId, userId, doctorId, amount, paymentMethod } = req.body;
    const commission = amount * 0.2;
    const doctorEarning = amount - commission;

    const transaction = new transactionModel({
      bookingId,
      userId,
      doctorId,
      amount,
      commission,
      doctorEarning,
      paymentMethod,
      paymentStatus: "completed"
    });
    await transaction.save();

    const doctor = await doctorModel.findById(doctorId);
    const user = await userModel.findById(userId);
    const invoicePath = await generateInvoice(transaction, doctor, user);

    // Update doctor wallet/payout record
    const payout = new payoutModel({
      doctorId,
      totalEarnings: amount,
      payoutAmount: doctorEarning,
      commission
    });
    await payout.save();

    res.json({
      success: true,
      message: "Payment processed successfully",
      transaction,
      invoicePath
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// 🟢 2. Admin Processes Payout
const processPayout = async (req, res) => {
  try {
    const { payoutId } = req.body;
    const payout = await payoutModel.findById(payoutId);
    if (!payout) return res.json({ success: false, message: "Payout not found" });

    payout.payoutStatus = "processed";
    payout.processedAt = new Date();
    await payout.save();

    res.json({ success: true, message: "Payout processed successfully", payout });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// 🟢 3. Get Doctor Revenue Report
const getDoctorRevenue = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const transactions = await transactionModel.find({ doctorId, paymentStatus: "completed" });
    const totalEarnings = transactions.reduce((sum, t) => sum + t.doctorEarning, 0);
    const totalCommission = transactions.reduce((sum, t) => sum + t.commission, 0);

    res.json({ success: true, totalEarnings, totalCommission, transactions });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { processPayment, processPayout, getDoctorRevenue };
