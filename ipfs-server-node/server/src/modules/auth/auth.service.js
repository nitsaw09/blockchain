const { ethers } = require('ethers');

const verifySignature = async ({signature}) => {
  const message = 'Test';
  // Verify the signature
  const recoveredAddress = ethers.utils.verifyMessage(message, signature);
  const isSignatureValid = recoveredAddress.toLowerCase() === address.toLowerCase();
  return isSignatureValid;
};

module.exports = { verifySignature };