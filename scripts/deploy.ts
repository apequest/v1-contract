import { ethers } from "hardhat";

async function main() {

  const Apequest = await ethers.getContractFactory("ApequestReward");
  const apequest = await Apequest.deploy();

  await apequest.deployed();

  const USDT = await ethers.getContractFactory("ERC20Token");
  const usdt = await USDT.deploy("USDT", "USDT");

  const USDC = await ethers.getContractFactory("ERC20Token");
  const usdc = await USDC.deploy("USDC", "USDC");

  await usdt.fakeMint("0x6B4c696B623FA9A2A6D5b6E9101Ef19CD973bc3C");  // Development
  await usdt.fakeMint("0xf088B67e92b46E0637E67b8a64A95cC709cD2f98");  // Account 3
  await usdt.fakeMint("0xB8bdE99FA1C45709455F73f974becEdB5656e933");  // Shashank

  await usdc.fakeMint("0x6B4c696B623FA9A2A6D5b6E9101Ef19CD973bc3C");  // Development
  await usdc.fakeMint("0xf088B67e92b46E0637E67b8a64A95cC709cD2f98");  // Account 3
  await usdc.fakeMint("0xB8bdE99FA1C45709455F73f974becEdB5656e933");  // Shashank

  await apequest.setToken(usdt.address)
  await apequest.setToken(usdc.address)

  console.log("Fake USDT ", usdt.address)
  console.log("Fake USDC ", usdc.address)
  console.log(`Apequest deployed to ${apequest.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
