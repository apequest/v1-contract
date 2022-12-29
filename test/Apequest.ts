import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ApequestReward } from "../typechain-types";

describe("Apequest", function () {

  let apequest: ApequestReward;
  let usdt: any;
  let usdc: any;
  let deployer: any;
  let creator1, creator2, user1, user2, user3;          // creator1 have usdt tokens // creator2 have usdc tokens

  async function deployFixture() {
    [deployer, creator1, creator2, user1, user2, user3] = await ethers.getSigners()
    const Apequest = await ethers.getContractFactory("ApequestReward");
    apequest = await Apequest.deploy();

    const Usdt = await ethers.getContractFactory("USDT");
    usdt = await Usdt.deploy(creator1.address);

    const Usdc = await ethers.getContractFactory("USDC");
    usdc = await Usdc.deploy(creator2.address);

    return {};
  }

  describe("Deployment", function () {
    it("init values", async function () {
      await deployFixture();
      let tx;
      let txn = await apequest.connect(deployer).setToken(usdt.address)
      tx = await txn.wait();
      txn = await apequest.connect(deployer).setToken(usdc.address)
      tx = await txn.wait();

      expect(await apequest.stableTokens(0)).to.be.equal(usdt.address)
      expect(await apequest.stableTokens(1)).to.be.equal(usdc.address)
      let data = await apequest.stableToken(usdt.address);
      expect(data.name).to.be.equal('USDT')
      expect(data.symbol).to.be.equal('USDT')
      expect(data.token).to.be.equal(usdt.address)
      expect(data.isActive).to.be.equal(true)

      data = await apequest.stableToken(usdc.address);
      expect(data.name).to.be.equal('USDC')
      expect(data.symbol).to.be.equal('USDC')
      expect(data.token).to.be.equal(usdc.address)
      expect(data.isActive).to.be.equal(true)

      expect(await apequest.tokenCounter()).to.be.equal(2);

    });

  });

  describe("Stake & quizz", function () {
    it("creator1 stake", async function () {



    });

  });




});
