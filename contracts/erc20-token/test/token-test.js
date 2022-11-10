const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token", function () {
  it("Should return the totalSupply after contract deploy", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(
      "IToken",
      "IToken",
      "100000000000000000000000"
    );
    await token.deployed();
    expect(await token.totalSupply()).to.equal(100000000000000000000000);
  });
});
