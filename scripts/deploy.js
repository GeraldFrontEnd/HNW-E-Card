// scripts/deploy.js
async function main() {
    // Retrieve the contract factory for IdentityStorage
    const IdentityStorage = await hre.ethers.getContractFactory("IdentityStorage");

    // Deploy the contract
    const identityStorage = await IdentityStorage.deploy();
    await identityStorage.deployed();

    // Log the contract address to the console
    console.log("IdentityStorage contract deployed to:", identityStorage.address);
}

// Run the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });