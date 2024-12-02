import { userSchemaModel } from "../models/users.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = "sjkabfdihasbfdhkafjdiausf";
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

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      JWT_SECRET
    );
    return res.status(200).json({ status: "ok", data: token });
  }
  res.status(404).json({ status: "error", message: "User/password error" });
};
