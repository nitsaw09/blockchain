const IPFS = require('ipfs-core');

class Ipfs {
  ipfs;
  constructor() {}

  async initializeIpfs() {
    this.ipfs = await IPFS.create();
  }

  async writeFle({ name, data }) {
    await this.ipfs.files.write(
      `/nft/${name}`,
      data,
      { create: true }
    );
    const { cid } = await this.ipfs.files.stat(`/nft/${name}`);
    return cid.toString();
  }

  async mkDir({ dirname }) {
    await this.ipfs.files.mkdir(dirname);
    const { cid } = await this.ipfs.files.stat(dirname);
    return cid.toString();
  }

  async getDirFiles({ dirHash }) {
    const filesList = [];
    for await (const file of this.ipfs.files.ls(`/ipfs/${dirHash}`)) {
      file.cid = file.cid.toString();
      filesList.push(file);
    }
    return filesList;
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
