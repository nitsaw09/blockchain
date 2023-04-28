const { httpCodes, successResponse, errorResponse } = require('../../utils/response');
const { verifySignature } = require('./auth.service');

const verifySignature = async ({signature}, req, res) => {
    const isSignatureValid = await verifySignature({ signature });
    if (isSignatureValid) {
      return successResponse(res, 'Authenticated successfully');
    } else {
      return errorResponse(res, httpCodes[401]);
    }
};

module.exports = { verifySignature };