const express = require('express');
const connectDb = require('./config/connectDb');

const app = express();

// Connect DB
connectDb();

// Middleware

app.use(express.json());

app.get('/', (req, res) => res.json({ msg: 'Budget Application API' }));

// Routes

app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/budget', require('./routes/budget'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);
