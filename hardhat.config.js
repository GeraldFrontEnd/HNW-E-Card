require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.0", // Specify your Solidity version
  networks: {
    // Hardhat's in-memory network
    hardhat: {
      // Additional configuration can be added here if needed (like forking mainnet, etc.)
    },
    
    // Localhost configuration for running a Hardhat node instance
    localhost: {
      url: "http://127.0.0.1:8545", // Hardhat's local network URL
      // Uncomment and set accounts if needed, otherwise Hardhat provides default accounts when running `npx hardhat node`
    }
  },
  // Optional: specify a default network to use
  defaultNetwork: "localhost",
};
