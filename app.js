const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Routes
const index = require("./routes/index");
app.use("/food-finder/api", index);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
