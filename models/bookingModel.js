import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  consultationType: { type: String, enum: ["in-clinic", "video", "chat"], required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  fees: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  transactionId: { type: String },
  status: { type: String, enum: ["booked", "completed", "cancelled"], default: "booked" },
  createdAt: { type: Date, default: Date.now }
});

const bookingModel = mongoose.model("Booking", bookingSchema);
export default bookingModel;
