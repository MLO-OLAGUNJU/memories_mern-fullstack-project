import express from "express";
import bodyParser from "body-parser";
import { mongoose } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
