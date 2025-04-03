require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/hardhat-chainlink");  // Make sure to install the Chainlink Hardhat plugin
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4", // Specify Solidity version

  networks: {
    hardhat: {
      chainId: 1337,  // Hardhat's default chain ID
    },
    localhost: {
      url: "http://127.0.0.1:8545",  // Local Ethereum node (Hardhat default URL)
      accounts: [process.env.PRIVATE_KEY],  // Use your Ethereum account private key
    },
  },

  chainlink: {
    node: {
      // Chainlink node configuration
      chain_id: 1337, // Use the same Chain ID for local Hardhat network
      chain_name: "local", // Set the chain name to "local" for local testing
      http_url: "http://localhost:8545",  // Local Ethereum node (Hardhat node)
      ws_url: "ws://localhost:8546",  // WebSocket URL (if using WebSocket)
      
      cl_keystore_password: process.env.CHAINLINK_KEYSTORE_PASSWORD || "password1234567890", // Chainlink keystore password
      cl_api_user: process.env.CHAINLINK_API_USER || "user@chain.link",  // Chainlink API user
      cl_api_password: process.env.CHAINLINK_API_PASSWORD || "password1234567890",  // Chainlink API password
      
      // PostgreSQL connection to external DigitalOcean DB
      pg_user: process.env.PG_USER || "doadmin",  // PostgreSQL user (DigitalOcean DB user)
      pg_password: process.env.PG_PASSWORD || "your-database-password",  // PostgreSQL password (use .env for sensitive data)
      pg_db: process.env.PG_DB || "defaultdb",  // PostgreSQL database name
      pg_host: process.env.PG_HOST || "your-database-host.d.db.ondigitalocean.com",  // PostgreSQL host (DigitalOcean DB endpoint)
      pg_port: process.env.PG_PORT || 25060,  // PostgreSQL port (default for DigitalOcean DB is 25060)

      // Enabling SSL connection (required for DigitalOcean databases)
      pg_ssl: true,  // Ensure SSL is used to secure the connection
    }
  },

  // You can set additional parameters like etherscan, gas limits, etc.
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,  // Your Etherscan API key (if required)
  },
};
