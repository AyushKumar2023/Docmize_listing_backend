import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  amount: { type: Number, required: true },
  commission: { type: Number, default: 0 },
  doctorEarning: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  paymentMethod: { type: String, enum: ["razorpay", "stripe", "paypal", "cod"], required: true },
  createdAt: { type: Date, default: Date.now }
});

const transactionModel = mongoose.model("Transaction", transactionSchema);
export default transactionModel;
