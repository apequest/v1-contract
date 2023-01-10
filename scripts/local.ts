import { ethers } from "hardhat";

async function main() {

    const Apequest = await ethers.getContractFactory("ApequestReward");
    const apequest = await Apequest.deploy();

    await apequest.deployed();

    console.log(`Apequest deployed to ${apequest.address}`);

    const USDT = await ethers.getContractFactory("ERC20Token");
    const usdt = await USDT.deploy("USDT", "USDT");

    const USDC = await ethers.getContractFactory("ERC20Token");
    const usdc = await USDT.deploy("USDC", "USDC");

    await usdt.fakeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await usdt.fakeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    await usdt.fakeMint("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
    await usdt.fakeMint("0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65");

    await usdc.fakeMint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    await usdc.fakeMint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    await usdc.fakeMint("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
    await usdc.fakeMint("0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65");

    console.log("Fake USDT ", usdt.address)
    console.log("Fake USDC ", usdc.address)
    console.log("Apequest ", apequest.address)
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
