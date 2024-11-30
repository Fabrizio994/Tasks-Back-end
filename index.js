import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.CONNETION_URL_dev)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
