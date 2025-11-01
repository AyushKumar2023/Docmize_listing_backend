import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  consultationType: { type: String, enum: ["video", "chat", "in-clinic"], required: true },
  diagnosis: { type: String },
  prescription: { type: String },
  advice: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: { type: String, enum: ["scheduled", "in-progress", "completed"], default: "scheduled" }
});

const consultationModel = mongoose.model("Consultation", consultationSchema);
export default consultationModel;
