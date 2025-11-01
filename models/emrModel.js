import mongoose from "mongoose";

const emrSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  diagnosis: { type: String, required: true },
  prescription: { type: String, required: true },
  advice: { type: String },
  date: { type: Date, default: Date.now },
});

const emrModel = mongoose.model("EMR", emrSchema);
export default emrModel;
