require("@")
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("../hardhat-ss/tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */
const RB_RPC_URL = process.env.RB_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API = process.env.ETHERSCAN_API || "";
const CMC_API = process.env.COINMARKETCAP_API || "";

module.exports = {
    networks: {
        rinkbey: {
            url: RB_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainID: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainID: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API,
    },
    gasReporter: {
        enabled: false,
        outputFile: "GasReport.txt",
        noColors: true,
        currency: "usd",
        coinmarketcap: CMC_API,
    },
};

task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});
