const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

<<<<<<< HEAD
// Connect to MongoDB
=======

>>>>>>> ce8808b511d5faa17d24763437866eee39c24269
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

=======

app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});
>>>>>>> ce8808b511d5faa17d24763437866eee39c24269

app.use("/api/auth", require("./routes/auth"));
app.use("/api/transaction", require("./routes/transaction"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
