// SPDX-License-Identifier: MIT
// specify the type of license - MIT / 
pragma solidity ^0.8.0;
import "hardhat/console.sol"; // console log from solidity
// enables output to shown on the terminal, on hardhat console terminal 

contract IdentityStorage { // Main Contract .etherContractFactory get the storage data 
    // Define an identity structure
    struct Identity {
        string name;
        uint256 age;
        string email;
        bool exists;
    }

    // Mapping to store identities by user address
    mapping(address => Identity) private identities;

    // Event to emit when an identity is created or updated
    event IdentityCreated(address indexed user, string name, uint256 age, string email);
    event IdentityUpdated(address indexed user, string name, uint256 age, string email);

    // Function to create or update an identity
    function setIdentity(string memory _name, uint256 _age, string memory _email) public {
        require(bytes(_name).length > 0, "Name is required");
        require(_age > 0, "Age must be greater than zero");
        require(bytes(_email).length > 0, "Email is required");

        // Create or update identity for the sender's address
        identities[msg.sender] = Identity({
            name: _name,
            age: _age,
            email: _email,
            exists: true
        });

        // Emit appropriate event based on whether the identity is new or updated
        if (identities[msg.sender].exists) {
            emit IdentityUpdated(msg.sender, _name, _age, _email);
        } else {
            emit IdentityCreated(msg.sender, _name, _age, _email);
        }
    }

    // Function to retrieve the identity of the caller #retrieve information from the calller address 
    function getMyIdentity() public view returns (string memory, uint256, string memory) {
        require(identities[msg.sender].exists, "Identity does not exist");
        Identity storage identity = identities[msg.sender];
        return (identity.name, identity.age, identity.email);
    }

    // Function to retrieve the identity by user address #retrieve any public user information stored on the ethereum network 
    function getIdentity(address _user) public view returns (string memory, uint256, string memory) {
        require(identities[_user].exists, "Identity does not exist");
        Identity storage identity = identities[_user];
        return (identity.name, identity.age, identity.email);
    }
}