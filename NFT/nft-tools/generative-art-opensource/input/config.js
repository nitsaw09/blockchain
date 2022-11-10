const dir = __dirname;
const width = 1000;
const height = 1000;
const description = "This is an NFT made by the coolest generative code.";
const baseImageUri = "https://hashlips/nft";
const startEditionFrom = 1;
const endEditionAt = 10;
const editionSize = 10;
const raceWeights = [
  {
    value: "joy",
    from: 1,
    to: 5,
  },
  {
    value: "sorrow",
    from: 6,
    to: editionSize,
  },
];

const races = require("./config/races")({ dir, width, height });

module.exports = {
  width,
  height,
  description,
  baseImageUri,
  editionSize,
  startEditionFrom,
  endEditionAt,
  races,
  raceWeights,
};
