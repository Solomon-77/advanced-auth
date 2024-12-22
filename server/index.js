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

const connectWithRetry = () => {
   mongoose.connect(process.env.MONGODB_URI)
      .then(() => console.log("MongoDB Connected."))
      .catch(err => {
         console.log("MongoDB Connection Error: ", err);
         console.log("Retrying in 0.5s second...");
         setTimeout(connectWithRetry, 500);
      });
};

connectWithRetry();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));