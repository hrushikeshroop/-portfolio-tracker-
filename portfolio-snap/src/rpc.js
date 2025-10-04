require("dotenv").config();
const { ethers } = require("ethers");
const abi = require("./contract/abi.json");
const addresses = require("./contract/address.json");

// Use Alchemy RPC from .env instead of Infura
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);

async function getPriceFromContract() {
  const contract = new ethers.Contract(addresses.sepolia, abi, provider);
  const price = await contract.getLatestPrice();
  return Number(price) / 1e8; // Chainlink uses 8 decimals
}

async function getPortfolio() {
  // Request current MetaMask account
  const [account] = await ethereum.request({ method: "eth_requestAccounts" });

  // Fetch ETH balance
  const ethBalance = await ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });

  const balanceInEth = Number(ethBalance) / 1e18;
  const ethPrice = await getPriceFromContract();

  return {
    balance: balanceInEth,
    valueUSD: balanceInEth * ethPrice,
  };
}

module.exports = { getPortfolio };
