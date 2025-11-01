import doctorModel from "../models/doctorModel.js";

// 🟢 1. Doctor applies
const applyDoctor = async (req, res) => {
  try {
    const doctorData = req.body;
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Application submitted successfully! Pending verification." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 2. Admin verifies doctor
const verifyDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { verified: true, listed: true },
      { new: true }
    );

    res.json({ success: true, message: "Doctor verified and listed successfully!", doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 3. Admin rejects doctor
const rejectDoctor = async (req, res) => {
  try {
    const { doctorId } = req.body;
    await doctorModel.findByIdAndDelete(doctorId);
    res.json({ success: true, message: "Doctor application rejected and removed." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 4. Admin adds marketing credits
const addMarketingCredits = async (req, res) => {
  try {
    const { doctorId, credits } = req.body;

    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { $inc: { marketingCredits: credits } },
      { new: true }
    );

    res.json({ success: true, message: "Credits added successfully!", doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 5. Get all doctors (for admin)
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().sort({ createdAt: -1 });
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 Search/Filter Doctors
const searchDoctors = async (req, res) => {
  try {
    const { specialization, location, minFees, maxFees, sortBy } = req.query;

    let filter = { listed: true, verified: true };

    if (specialization) filter.specialization = { $regex: specialization, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (minFees || maxFees)
      filter.fees = { $gte: Number(minFees) || 0, $lte: Number(maxFees) || 99999 };

    let query = doctorModel.find(filter);

    if (sortBy === "fees_low_to_high") query = query.sort({ fees: 1 });
    if (sortBy === "fees_high_to_low") query = query.sort({ fees: -1 });
    if (sortBy === "experience") query = query.sort({ experience: -1 });

    const doctors = await query;
    res.json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 🟢 Get Doctor Profile
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await doctorModel.findById(id);

    if (!doctor || !doctor.listed || !doctor.verified)
      return res.json({ success: false, message: "Doctor not found or not verified" });

    res.json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  applyDoctor,
  verifyDoctor,
  rejectDoctor,
  addMarketingCredits,
  getAllDoctors,
  searchDoctors,
  getDoctorById
};
