require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running.');
})

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));