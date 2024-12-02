import { userSchemaModel } from "../models/users.js";
import mongoose from "mongoose";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const allusers = await userSchemaModel.find();

    res.status(200).json(allusers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add a user
export const AddUser = async (req, res) => {
  const newUser = new userSchemaModel(req.body);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get a user by id
export const CallUserById = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");

    const user = await userSchemaModel.findById(_id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a user
export const DeleteUser = async (req, res) => {
  try {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");

    await userSchemaModel.findByIdAndDelete(_id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a user
export const UpdateUser = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No user with that id");

    const user = await userSchemaModel.findByIdAndUpdate(_id, data, {
      new: true,
    });

    if (!user) return res.status(404).send("No user with that id");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
