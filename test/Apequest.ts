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
  let creator1: any;
  let creator2:any,user1, user2, user3;          // creator1 have usdt tokens // creator2 have usdc tokens

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

    it("creator1 quizz and stake", async function () {
      let txn, tx;

      tx = await usdt.connect(creator1).balanceOf(creator1.address);
      tx = await usdt.connect(creator1).approve(apequest.address, ethers.utils.parseEther("10"));
      txn = await tx.wait();

      tx = await apequest.connect(creator1).stake(usdt.address, ethers.utils.formatBytes32String("123456asaasc"), ethers.utils.parseEther("5"));
      txn = await tx.wait()

      tx = await apequest.quizz(ethers.utils.formatBytes32String("123456asaasc"));

      expect(tx.cid).to.be.equal(1);
      expect(tx.amount).to.be.equal(ethers.utils.parseEther("5"));
      expect(tx.aid).to.be.equal(ethers.utils.formatBytes32String("123456asaasc"));
    });

    it("creator2 quizz and stake", async function () {
      let txn, tx;

      tx = await usdc.connect(creator2).balanceOf(creator2.address);
      tx = await usdc.connect(creator2).approve(apequest.address, ethers.utils.parseEther("10"));
      txn = await tx.wait();

      tx = await apequest.connect(creator2).stake(usdc.address, ethers.utils.formatBytes32String("1851515sdcsdc"), ethers.utils.parseEther("5"));
      txn = await tx.wait()

      tx = await apequest.quizz(ethers.utils.formatBytes32String("1851515sdcsdc"));

      expect(tx.cid).to.be.equal(2);
      expect(tx.amount).to.be.equal(ethers.utils.parseEther("5"));
      expect(tx.aid).to.be.equal(ethers.utils.formatBytes32String("1851515sdcsdc"));
    });
    

  });




});
