const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const accessToken = req.body.data.access_token;

  try {
    const response = await axios.post('https://sandbox.plaid.com/identity/get', {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      access_token: accessToken
    });

    const identity = response.data.accounts[0].owners[0];

    res.json({
      jobRunID: req.body.id,
      data: {
        name: identity.names[0],
        email: identity.emails[0].data,
        phone: identity.phone_numbers[0].data
      },
      statusCode: 200
    });
  } catch (error) {
    console.error('Error fetching from Plaid:', error.message);
    res.status(500).json({ jobRunID: req.body.id, error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Mock External Adapter listening on port ${PORT}`));
