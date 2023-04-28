const ethers = require("ethers");
class Auth {
  provider;
  signer;
  constructor(provider) {
    this.provider = new ethers.providers.Web3Provider(provider);
    this.signer = this.provider.getSigner();
  }

  async connectWallet() {
    try {
      await this.provider.send("eth_requestAccounts", []);
      return this.signer.getAddress();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getContractData(contractAddr, abi, method, params = []) {
    try {
      const contract = new ethers.Contract(contractAddr, abi, this.signer);
      const contractTx = await contract[method].apply(null, params);
      const mintRate = ethers.utils.formatUnits(contractTx, "ether");
      return mintRate;
    } catch (err) {
      throw new Error(err);
    }
  }

  async signMessage(message) {
    try {
      this.signer = await this.provider.getSigner();
      const signature = await this.signer.signMessage(message);
      return signature;
    } catch (err) {
      throw new Error(err);
    }
  }

  async sendTransaction(contractAddr, abi, method, params = [], txFee) {
    // eslint-disable-next-line no-useless-catch
    try {
      const contract = new ethers.Contract(contractAddr, abi, this.signer);
      let contractTx = await contract[method].apply(null, [...params, txFee]);
      return contractTx;
    } catch (err) {
      throw err;
    }
  }
}

export default Auth;
