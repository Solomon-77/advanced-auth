require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
   res.send('Server is running.');
})

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("MongoDB Connected.")
   } catch (err) {
      console.log("MongoDB Connection Error: ", err)
      console.log("Retrying in 0.5s second...")
      setTimeout(connectDB, 500)
   }
};

connectDB();

const routes_auth = require("./src/routes/auth");
app.use("/auth", routes_auth)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));