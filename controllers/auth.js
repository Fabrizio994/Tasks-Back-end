import { userSchemaModel } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  const passwordHashed = await bcrypt.hash(password, 10);
  const user = new userSchemaModel({
    username: username,
    password: passwordHashed,
    email: email,
  });
  try {
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userSchemaModel.findOne({ username: username });

  if (!user) {
    return res
      .status(404)
      .json({ status: "error", message: "User/password error" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(404)
      .json({ status: "error", message: "User/password error" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id, username: user.username },
    REFRESH_TOKEN_SECRET
  );

  refreshTokens.push(refreshToken);

  res
    .status(200)
    .json({ status: "success", token, refreshToken, id: user._id });
};

export const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken });
  });
};

// res.status(200).json({ status: "success", token });
