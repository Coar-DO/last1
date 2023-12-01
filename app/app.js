const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb://mongodb-service:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const numberSchema = new mongoose.Schema({
  value: Number,
});

const NumberModel = mongoose.model("Number", numberSchema);

app.use(express.json());

app.post("/addNumber", async (req, res) => {
  const { value } = req.body;

  if (!value || typeof value !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const newNumber = new NumberModel({ value });
    await newNumber.save();
    return res.json({ success: true, value });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
