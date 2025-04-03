const express = require('express');
const bodyParser = require('body-parser');
const { createRequest } = require('./index');




const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/', (req, res) => {
  console.log("📥 Received POST request to /");
  console.log("🧾 Request body:");
  console.log(JSON.stringify(req.body, null, 2));

  createRequest(req.body, (statusCode, data) => {
    console.log("📤 Sending response to Chainlink:");
    console.log(JSON.stringify(data, null, 2));
    res.status(statusCode).json(data);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
