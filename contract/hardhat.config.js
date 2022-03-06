require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

// const HARMONY_PRIVATE_KEY = process.env.PRIVATE_KEY;
const HARMONY_PRIVATE_KEY = "YOUR-PRIVATE-KEY";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: {
		version: "0.8.4",
		optimizer: {
			enabled: true,
			runs: 1000,
		},
	},
	networks: {
		hardhat: {
			chainId: 1337,
			allowUnlimitedContractSize: true,
		},
		localhost: {
			url: "http://localhost:8545",
			allowUnlimitedContractSize: true,
		},
		testnet: {
			url: `https://api.s0.b.hmny.io`,
			accounts: [`0x${HARMONY_PRIVATE_KEY}`],
			allowUnlimitedContractSize: true,
		},
		mainnet: {
			url: `https://api.harmony.one`,
			accounts: [`0x${HARMONY_PRIVATE_KEY}`],
			allowUnlimitedContractSize: true,
		}
	},
	namedAccounts: {
		deployer: 0,
	},
	paths: {
		deploy: "deploy",
		deployments: "deployments",
	},
};
