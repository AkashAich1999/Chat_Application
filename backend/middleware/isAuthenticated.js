import jwt from "jsonwebtoken";
// Authentication logic
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "User not Authenticated." });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode);
    if (!decode) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
