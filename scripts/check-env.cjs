require('dotenv/config');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ARB_RPC_URL = process.env.ARB_RPC_URL;

console.log('Checking .env configuration...\n');
console.log('ARB_RPC_URL:', ARB_RPC_URL ? 'SET (length: ' + ARB_RPC_URL.length + ')' : 'NOT SET');
console.log('PRIVATE_KEY:', PRIVATE_KEY ? 'SET (length: ' + PRIVATE_KEY.length + ')' : 'NOT SET');

if (PRIVATE_KEY) {
    const isValidPrivateKey = /^(0x)?[0-9a-fA-F]{64}$/.test(PRIVATE_KEY);
    console.log('Private key valid (64 hex chars):', isValidPrivateKey);
    console.log('Private key starts with 0x:', PRIVATE_KEY.startsWith('0x'));
    console.log('Private key first 10 chars:', PRIVATE_KEY.substring(0, 10) + '...');
} else {
    console.log('\nERROR: PRIVATE_KEY is not set in .env file!');
}
