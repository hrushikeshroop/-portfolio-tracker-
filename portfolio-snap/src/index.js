const { getPortfolio } = require("./rpc");
const { renderPortfolioUI } = require("./ui");

module.exports.onRpcRequest = async ({ request }) => {
  switch (request.method) {
    case "getPortfolio":
      const portfolio = await getPortfolio();
      return await renderPortfolioUI(portfolio);

    default:
      throw new Error("Method not found.");
  }
};
