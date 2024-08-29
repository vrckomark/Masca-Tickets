const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.get("/health-check", (req, res) => {
  res.json({ status: 200, message: "Client-Server communication successful" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/* TEST MONGODB connect */

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
