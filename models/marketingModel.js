import mongoose from "mongoose";

const marketingSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  credits: { type: Number, default: 0 },
  expiryDate: { type: Date },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const marketingModel = mongoose.model("Marketing", marketingSchema);
export default marketingModel;
