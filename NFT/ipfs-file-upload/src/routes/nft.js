const express = require("express");
const NFT = require("../models/nft");
const router = express.Router();
const Token = require("../contracts/token");

/**
 * Upload NFT files and metadata
 * req: owner(address), name(string), description(string), traits(array) 
 */
router.post("/upload-nft", async (req, res) => {
    try {
        const { nft } = req.files;
        const { ipfs } = global.IPFS;
        const { owner, name, description, traits } = req.body;
        await ipfs.files.write(
            `/nft/${nft.name}`,
            nft.data,
            { create: true }
        );
        const { cid } = await ipfs.files.stat(`/nft/${nft.name}`);
        const data = { 
            owner, 
            url: `ipfs://${cid}`,
            fileType: nft.mimetype,
            name, 
            description, 
            traits
        };
        
        const nftExist = await NFT.findOne({ url: data.url });
        if (nftExist) {
            res.status(401).json({ error: true, message: 'NFT already exist' });
        }

        const cnt = await NFT.find({}).countDocuments();
        data.tokenId = cnt;
        await NFT.updateOne({ url: data.url }, data, {upsert: true});
        const nftData = await NFT
            .findOne({ url: data.url })
            .select(" name description url attributes");

        await ipfs.files.write(
            `/nft/metaData/${data.tokenId}`,
            JSON.stringify(nftData),
            { create: true }
        );
        const metaData = await ipfs.files.stat(`/nft/metaData/${data.tokenId}`);
        res.status(200).json(nftData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            error: true, 
            message: err.code || err.message
        });
    } 
});

/**
 * Create NFT collection base url for image and metadata
 */
router.post('/create-base-url', async (req, res) => {
    try {
        const { ipfs } = global.IPFS;
        await ipfs.files.mkdir('/nft');
        await ipfs.files.mkdir('/nft/metaData');
        const { cid } = await ipfs.files.stat('/nft/metaData');
        res.status(200).json({ baseUrl: `ipfs://${cid}` });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.code || err.message
        });
    }
})

/**
 * Mint NFT token
 */
router.post('/', async (req, res) => {
    const token = new Token();
    const tokens = await token.mint(2);
    res.send(tokens);
})

/**
 * Get the NFT base url
 */
router.get('/token-base-url', async (req, res) => {
    try {
        const { cid } = await global.IPFS.ipfs.files.stat('/nft/metaData');
        res.status(200).json({ baseUrl: `ipfs://${cid}` });
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.code || err.message
        });
    }
});

/**
 * Get the NFT metadata
 */
router.get('/metadata/:tokenId', async (req, res) => {
    try {
        const { tokenId } = req.params;
        const { ipfs } = global.IPFS;
        const { cid } = await ipfs.files.stat(`/nft/metaData/${tokenId}`);
        const nftMetadata = await global.IPFS.getByCID(cid); 
        let buff = Buffer.from(nftMetadata, 'base64');
        let data = JSON.parse(buff.toString('ascii').replace('x"}', ''));
        res.send(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.code || err.message
        });
    }
})

/**
 * Get the NFT image file in base64
 */
router.get('/:cid', async (req, res) => {
    try {
        const nft = await global.IPFS.getByCID(req.params.cid);
        res.send(`<img src='data:image/png;base64,${nft}' />`);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.code || err.message
        });
    }
})

module.exports = router;