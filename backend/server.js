const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

// Endpoint to serve the student report data
app.get("/api/report", (req, res) => {
  const filePath = path.join(__dirname, "data.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.json(jsonData);
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
