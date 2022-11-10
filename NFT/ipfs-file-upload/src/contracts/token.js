const ethers = require('ethers');
const abi = require('./abi/token.json');

class Token {
    constructor() {
        this.provider = new ethers.providers.FallbackProvider([
            ethers.getDefaultProvider('ropsten')
        ], 1);
        const contract = new ethers.Contract('0xF064631e04c051032C01C65A51AE58Ee992ee83A', abi, this.provider);
        const wallet = new ethers.Wallet('2c34e2e00256a52f9d9433ef718721d3e308539956f68927bcdc73a39908ca7d', this.provider);
        this.contract = contract.connect(wallet);
    }

    async mint(quantity) {
        try { 
            const value = quantity * 1000000000000000;
            let tx = await this.contract.mint(quantity, "0x00", { value, gasLimit: '3000000' });
            console.log(tx.hash);
            setTimeout(() => console.log(1000), 100000);
            this.provider.once(tx.hash, (tx) => {
                console.log(tx);
                let iface = new ethers.utils.Interface(abi)
                let decodedData = iface.parseTransaction({ data: tx.data });
                console.log("data: ", decodedData);
            });
            //return tx;
        } catch (err) {
            console.log(err);
        }
    }

    async getMintRate() {
        console.log(ethers.utils.formatUnits(await this.contract.getMintRate(), '18'));
    }
}

const token = new Token();
token.mint(1);

//module.exports = Token;