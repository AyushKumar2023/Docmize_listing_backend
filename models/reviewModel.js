import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
