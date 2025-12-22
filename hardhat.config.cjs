require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-ethers');
require('dotenv/config');

const ARB_RPC_URL = process.env.ARB_RPC_URL || 'https://sepolia-rollup.arbitrum.io/rpc';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Validate private key - must be 64 hex characters (32 bytes)
const isValidPrivateKey = PRIVATE_KEY && /^(0x)?[0-9a-fA-F]{64}$/.test(PRIVATE_KEY);

module.exports = {
  solidity: '0.8.20',
  networks: {
    hardhat: {},
    arbitrum: {
      url: ARB_RPC_URL,
      accounts: isValidPrivateKey ? [PRIVATE_KEY.startsWith('0x') ? PRIVATE_KEY : `0x${PRIVATE_KEY}`] : [],
    },
  },
};
