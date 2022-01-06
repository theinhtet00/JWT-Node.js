import { User } from "../Model/table";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

const index = (req, res) => {
  const name = req.user.user.FirstName + " " + req.user.user.LastName;
  res.send(`Welcome ${name}`);
};

const register = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    if (!(FirstName && LastName && Email && Password)) {
      res.status(400).send("All input is required");
    }
    const old_user = await User.findOne({ where: { Email } });
    if (old_user) {
      res.status(409).send("User already exist");
    }
    const encrypted_password = await bcrypt.hash(Password, 10);
    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.create({
      FirstName,
      LastName,
      Email,
      Password: encrypted_password,
      Token: token,
    });

    res.status(201).json(user);
  } catch (err) {
    res.send(err);
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!(Email && Password)) res.status(400).send("All input is required");

    const user = await User.findOne({ where: { Email } });
    if (user && (await bcrypt.compare(Password, user.Password))) {
      const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
      user.Token = token;
      res.status(200).json(user);
    } else {
      res.status(400).end("Invalid login");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
  register,
  login,
};
