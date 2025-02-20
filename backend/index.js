const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (for development)
app.use(cors({
  origin: '*', // Or set to 'http://localhost:8080' to allow only the frontend
}));

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hola Esh tester from Backend!' });
});

app.listen(PORT, () => {
    console.log(`Backend's home port is ${PORT}`);
});
