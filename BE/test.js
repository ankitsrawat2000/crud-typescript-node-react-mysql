require('dotenv').config();
const express = require('express');
const app = express();

app.get('/csv/mail/send-reminders', (req, res) => {
  const apiKeyFromQuery = req.query.apiKey;
  const validApiKey = process.env.API_KEY;

  if (!apiKeyFromQuery || apiKeyFromQuery !== validApiKey) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }

  // ✅ Authorized, proceed with your logic
  res.json({ message: 'Reminders sent successfully!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

