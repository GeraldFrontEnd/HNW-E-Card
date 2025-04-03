const { Requester } = require('@chainlink/external-adapter');
const axios = require('axios');

// ✅ Hardcoded credentials (for testing only)
const PLAID_CLIENT_ID = "67b6f057f37a4c001e5fe739";
const PLAID_SECRET = "837478e8ee9310581e314f1d4cc4ce";
const PLAID_ENV = "sandbox";
const ACCESS_TOKEN = "access-sandbox-6eccf1f6-bbd1-4198-923a-aacabc27f3a0"; // <-- your real token from Plaid

const createRequest = async (input, callback) => {
  const jobRunID = input.id || '1';

  const url = `https://${PLAID_ENV}.plaid.com/identity/get`;

  const headers = {
    'Content-Type': 'application/json'
  };

  const data = {
    client_id: PLAID_CLIENT_ID,
    secret: PLAID_SECRET, 
    access_token: ACCESS_TOKEN
  };

  try {
    const response = await axios.post(url, data, { headers });
    const account = response.data.accounts?.[0];
    const owner = account?.owners?.[0];

    const identity = {
      name: owner?.names?.[0] || 'Unknown',
      email: owner?.emails?.find(e => e.primary)?.data || 'Unknown',
      phone: owner?.phone_numbers?.find(p => p.primary)?.data || 'Unknown',
      address: owner?.addresses?.find(a => a.primary)?.data || {}
    };

    callback(200, Requester.success(jobRunID, { data: { result: identity } }));
  } catch (error) {
    console.error('Plaid Error:', error.response?.data || error.message);
    callback(500, Requester.errored(jobRunID, error));
  }
};

module.exports.createRequest = createRequest;