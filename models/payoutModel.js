import mongoose from "mongoose";

const payoutSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  totalEarnings: { type: Number, required: true },
  payoutAmount: { type: Number, required: true },
  commission: { type: Number, required: true },
  payoutStatus: { type: String, enum: ["pending", "processed"], default: "pending" },
  processedAt: { type: Date },
});

const payoutModel = mongoose.model("Payout", payoutSchema);
export default payoutModel;
