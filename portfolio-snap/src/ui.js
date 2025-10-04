const { panel, heading, text } = require("@metamask/snaps-ui");

async function renderPortfolioUI(portfolio) {
  return panel([
    heading("Portfolio Tracker"),
    text(`ETH Balance: ${portfolio.balance.toFixed(4)} ETH`),
    text(`USD Value: $${portfolio.valueUSD.toFixed(2)}`)
  ]);
}

module.exports = { renderPortfolioUI };
