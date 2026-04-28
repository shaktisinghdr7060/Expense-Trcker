// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenseTracker', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define MongoDB schema
const transactionSchema = new mongoose.Schema({
  text: String,
  amount: Number,
  date: Date,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.use(cors());
app.use(bodyParser.json());

// Save transaction to MongoDB
app.post('/api/transactions', (req, res) => {
  const { text, amount, date } = req.body;
  
  const transaction = new Transaction({ text, amount, date });

  transaction.save((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    console.log('Transaction saved to MongoDB');
    res.status(200).send('Transaction saved to MongoDB');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
