import mongoose from "mongoose";

const crmSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  type: { type: String, enum: ["lead", "inquiry", "reminder"], required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  followUpDate: { type: Date },
  status: { type: String, enum: ["pending", "contacted", "closed"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const crmModel = mongoose.model("CRM", crmSchema);
export default crmModel;
