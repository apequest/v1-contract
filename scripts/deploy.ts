import { ethers } from "hardhat";

async function main() {

  const Apequest = await ethers.getContractFactory("ApequestReward");
  const apequest = await Apequest.deploy();

  await apequest.deployed();

  console.log(`Apequest deployed to ${apequest.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
