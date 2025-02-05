const express = require('express');
const cors = require('cors');
const numberRoutes = require('./routes/numberRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', numberRoutes); // Use the routes as middleware

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});