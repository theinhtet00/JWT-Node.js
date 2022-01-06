import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export default auth;
