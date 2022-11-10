const { LazyMinter } = require("./LazyMinter.js");
const ethers = require("ethers");
class Voucher {
  provider;
  signer;
  constructor(contract, provider) {
    this.provider = new ethers.providers.Web3Provider(provider);
    this.signer = this.provider.getSigner();
    const contractObject = {
      address: contract,
      getChainID: function() {
        return provider.chainId || 1337;
      }
    };
    this.voucher = new LazyMinter({
      contract: contractObject,
      signer: this.signer
    });
  }

  async getVoucher(tokenId, uri, minPrice) {
    return await this.voucher.createVoucher(tokenId, uri, minPrice);
  }
}

module.exports = {
  Voucher
};
