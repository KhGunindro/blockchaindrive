# Blockchain File Sharing System

This project is a decentralized file-sharing system built on the Ethereum blockchain. It leverages Solidity for smart contract development, React 19.0 for the frontend, Hardhat as the development environment, and ethers.js for interacting with the blockchain.

## Features
- Decentralized file storage using IPFS (Pinata)
- Ethereum smart contract for access control
- User-friendly React frontend
- Secure and efficient file transactions
- Smart contract deployment with Hardhat

## Tech Stack
- **Smart Contract:** Solidity (pragma solidity >=0.7.0 <0.9.0)
- **Blockchain Framework:** Hardhat
- **Frontend:** React 19.0, ethers.js
- **Storage:** IPFS (Pinata)

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Hardhat](https://hardhat.org/)
- [Metamask](https://metamask.io/) browser extension
- [Pinata](https://pinata.cloud/) IPFS account

## Setup and Installation

### 1. Clone the Repository
```sh
git clone https://github.com/KhGunindro/blockchaindrive.git
cd blockchaindrive
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup Hardhat
```sh
npx hardhat
```
Choose **Create an empty hardhat.config.js** and install Hardhat dependencies:
```sh
npm install --save-dev hardhat ethers dotenv
```

### 4. Configure Hardhat
Create a `.env` file in the root directory and add:
```
PRIVATE_API_KEY=your_api_keys
```
Update `hardhat.config.js`:
```javascript
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
};
```

### 5. Start the Local Blockchain
```sh
npx hardhat node
```

### 6. Deploy the Smart Contract Locally
Open a new terminal and run:
```sh
npx hardhat run scripts/deploy.js --network hardhat
```

### 7. Start the Frontend
```sh
cd client
npm install
npm start
```

## Usage
1. Connect your Metamask wallet
2. Upload a file (stored on IPFS via Pinata)
3. Share the file securely using Ethereum smart contracts
