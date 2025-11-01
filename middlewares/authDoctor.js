import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) return res.json({ success: false, message: "Doctor login required" });

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.doctorId = decoded.doctorId;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unauthorized or expired doctor token" });
  }
};

export default authDoctor;
