import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { utoken } = req.headers;
    if (!utoken) return res.json({ success: false, message: "Login required" });

    const decoded = jwt.verify(utoken, process.env.JWT_SECRET);
    req.body.userId = decoded.userId; // attach user ID to request body
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unauthorized or expired token" });
  }
};

export default authUser;
