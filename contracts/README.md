# Contracts

This folder contains minimal smart contracts for ArbiLearn (certificate NFTs and a marketplace).

Contracts:
- `CertificateNFT.sol` - ERC-721 certificate contract. Owner can assign *issuers* (e.g., marketplace) allowed to mint certificates.
- `CourseMarketplace.sol` - Simple marketplace storing course prices and purchase state. After purchase, owner can call `issueCertificate` to mint an NFT to the buyer.

Quickstart (local):
1. Install dev deps: `pnpm install` (already added Hardhat tooling in `package.json`).
2. Compile: `pnpm contracts:compile`
3. Run tests: `pnpm contracts:test`
4. Deploy locally: `pnpm contracts:deploy` (requires a running Hardhat node or tweak network flag)

Notes & recommended improvements:
- Add an indexer (The Graph) to index purchases and certificates for faster queries in the dashboard.
- Add role-based access control (OpenZeppelin AccessControl) for more granular permissions (e.g., course authors issuing certificates).
- Add events and reentrancy checks (already used ReentrancyGuard in marketplace) and add unit tests for edge cases and failure modes.
