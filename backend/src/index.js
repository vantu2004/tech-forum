import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
