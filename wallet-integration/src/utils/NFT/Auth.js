const ethers = require("ethers");
class Auth {
  provider;
  signer;
  constructor(provider) {
    this.provider = new ethers.providers.Web3Provider(provider);
  }

  async connectWallet() {
    try {
      await this.provider.send("eth_requestAccounts", []);
      this.signer = this.provider.getSigner();
      return this.signer.getAddress();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAccountDetails() {
    try {
      const account = await this.signer.getAddress();
      const balance = await this.signer.getBalance();
      return { account, balance };
    } catch (err) {
      throw new Error(err);
    }
  }

  async signMessage(message) {
    try {
      const signature = await this.signer.signMessage(message);
      return signature;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Auth;
