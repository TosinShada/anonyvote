const { genExternalNullifier } = require('../utils');

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const depth = 20;

    // The two dependecies will be deployed and their address gotten prior to the deployment of semaphore
    const poseidonT3 = await deployments.get("PoseidonT3")
    const poseidonT6 = await deployments.get("PoseidonT6")

    // The external nullifier string is translated to hash prior to deployment
    const externalNullifier = genExternalNullifier('test-voting');

    // Semaphore is deployed on chain with the contract address of poseidonT3 and poseidonT6 as libraries
    const verifier = await deploy('Verifier', {
      from: deployer,
      log: true
    });

    // Semaphore is deployed on chain with the contract address of poseidonT3 and poseidonT6 as libraries
    const semaphore = await deploy('Semaphore', {
      from: deployer,
      log: true,
      args: [depth, externalNullifier, verifier.address],
      libraries: {
        PoseidonT3: poseidonT3.address,
        PoseidonT6: poseidonT6.address
      }
    });

    // After deploying the core Semaphore, then Semaphore client is also deployed on chain
    // This will bring the total number of deployments to 4
    await deploy('SemaphoreClient', {
      from: deployer,
      log: true,
      args: [semaphore.address],
    });
};
module.exports.tags = ['complete'];
module.exports.dependencies = ['PoseidonT3', 'PoseidonT6'];
