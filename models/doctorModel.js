import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  experience: { type: Number, required: true },
  fees: { type: Number, required: true },
  location: { type: String },
  bio: { type: String },
  documents: [{ type: String }], // URLs (cloudinary, etc.)
  verified: { type: Boolean, default: false }, // Admin verifies
  listed: { type: Boolean, default: false }, // Visible in marketplace
  marketingCredits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const doctorModel = mongoose.model("Doctor", doctorSchema);

export default doctorModel;
