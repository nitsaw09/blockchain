const IPFS = require('ipfs-core');

class Ipfs {
  ipfs;
  constructor() {}

  async initializeIpfs() {
    this.ipfs = await IPFS.create();
  }

  async getByCID(cid) {
    try {
      let buffer = '';
      for await (const buf of this.ipfs.cat(cid)) {
        buffer = buffer + Buffer.from(buf).toString('base64');
      }
      return buffer;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Ipfs;
