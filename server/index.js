import express from "express";
import bodyParser from "body-parser";
import { Mongoose } from "mongoose";
import cors from "cors";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://mlo_dev:mlo1234@cluster0.y0yldya.mongodb.net/?retryWrites=true&w=majority";
