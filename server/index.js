const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

require("dotenv").config();

const port = process.env.PORT || 3000;

app.get("/health-check", (req, res) => {
  res.json({ status: 200, message: "Client-Server communication successful" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
