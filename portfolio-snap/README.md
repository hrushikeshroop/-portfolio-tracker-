# Portfolio Tracker MetaMask Snap

**Portfolio Tracker Snap** is a MetaMask Snap that provides a simple portfolio-tracking feature directly inside your MetaMask wallet. It shows your current ETH balance and its equivalent value in USD by querying a smart contract on the Sepolia testnet that uses a Chainlink ETH/USD price feed.

## Features

* **Direct Wallet Integration:** View your portfolio value without leaving MetaMask (via a Snap UI panel).
* **Real-time Asset Value:** On-chain Chainlink oracle provides the ETH/USD price.
* **User-Friendly UI:** Clean panel using `@metamask/snaps-ui`.
* **Secure & Decentralized:** Price data sourced on-chain via Chainlink Price Feed.

## How It Works

The Snap is split into a few parts:

* **Frontend (MetaMask UI)** — `ui.js` uses `@metamask/snaps-ui` to render a panel inside MetaMask.
* **Snap Backend** — `index.js` is the Snap entry point and handles incoming RPC requests (e.g., `getPortfolio`).
* **RPC & Blockchain Logic** — `rpc.js` requests the current account, fetches native ETH balance, connects to Sepolia via an Alchemy RPC (using `ethers.js`), and calls `getLatestPrice()` on the deployed price-oracle contract.
* **Smart Contract & Oracle** — The contract at the address in `src/contract/address.json` queries the Chainlink ETH/USD price feed and returns the latest price.

## Prerequisites

* Node.js (v18+)
* Yarn
* MetaMask Flask (developer build)

## Getting Started

1. **Clone the repository**

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

2. **Install dependencies**

```bash
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the project root and add your Alchemy Sepolia HTTP endpoint:

```
ALCHEMY_API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
```

> Replace `your-api-key` with your Alchemy API key. If you use another RPC provider, replace the URL accordingly.

4. **Run the Snap locally**

```bash
yarn start
```

This will start the Snap dev server on `http://localhost:8080` (default).

5. **Connect with MetaMask Flask**

* Open a browser with MetaMask Flask installed.
* Navigate to `http://localhost:8080`.
* Approve the prompt to connect the "Portfolio Tracker" Snap and grant the requested permissions.

## Usage

* From the companion dapp (or UI entry), trigger the Snap's `getPortfolio` RPC method.
* The Snap will:

  1. Ask permission to view your account address.
  2. Fetch your ETH balance (native balance for that account).
  3. Call the deployed smart contract's `getLatestPrice()` to get ETH/USD.
  4. Display the total portfolio value in a MetaMask UI panel.

## Project Structure

```
.
├── src
│   ├── contract
│   │   ├── abi.json         # ABI for the price oracle smart contract
│   │   └── address.json     # Deployed contract address on Sepolia
│   ├── index.js             # Main Snap entry point, handles RPC requests
│   ├── rpc.js               # Core logic for fetching balance and price
│   └── ui.js                # Renders the UI panel inside MetaMask
├── .env.example             # Example environment file
├── package.json             # Project dependencies and scripts
└── snap.config.js           # Configuration for the MetaMask Snap CLI
```

