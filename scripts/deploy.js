const { ethers, run, network } = require("hardhat");
require("dotenv").config();

const readline = require("readline");

// async main
async function main() {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage");

    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.getDeployedCode();
    console.log(`Deployed!`);

    const nAddress = await simpleStorage.getAddress();
    console.log(`Deploy contract to:${nAddress} `);

    console.log(network.name);

    if (network.name == "rinkbey") {
        await simpleStorage.deploymentTransaction().wait(6);
        await verify(nAddress, []);
    } else {
        console.log("not verified");
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value: ${currentValue}`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const storing = await simpleStorage.store(8);
    await storing.wait(1);

    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value: ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log(`verifying contract`);
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(e);
        }
    }
}

// main()
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
