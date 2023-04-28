import {
    arrayify,
    hashMessage,
    recoverAddress,
    getAddress,
} from 'ethers/lib/utils';

export const isAccountAddress = ({ account }) => {
    try {
        getAddress(account.toLowerCase());
    } catch (err) {
        return false;
    }
    return true;
};
  
export const recoverAccountAddress = async ({ msg, signature }) => {
    const digest = arrayify(hashMessage(msg));
    const address = await recoverAddress(digest, signature);
    return address;
};
  