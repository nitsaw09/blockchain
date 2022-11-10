import * as fs from 'fs';
import * as path from 'path';
import { FireblocksSDK, PeerType, TransactionArguments, TransactionOperation } from "fireblocks-sdk";
import { ethers, PopulatedTransaction } from "ethers";

const apiSecret = fs.readFileSync(path.resolve(__dirname, "./fireblocks_secret.key"), "utf8");
const apiKey = "#Fireblock_Api_key";
const fireblocks = new FireblocksSDK(apiSecret, apiKey);

let txId;
const createTransaction = async () => {
    const payload: TransactionArguments = {
        assetId: 'ETH_TEST',
        source: {
            type: PeerType.VAULT_ACCOUNT,
            id: '1',
        },
        destination: {
            type: PeerType.EXTERNAL_WALLET,
            id: '#External_Wallet_Id'
        },
        amount: String(0.0001),
        fee: '0.0001',
        failOnLowFee: false,
        operation: TransactionOperation.TRANSFER,
        customerRefId: 'int_384524',
        note: "Created by fireblocks SDK"
    };
    const data =  await fireblocks.createTransaction(payload);
    txId = data.id;
    console.log(data);
}

const createContractTx = async () => {
    const CONTRACT_ADDRESS = "0xdacD69347dE42baBfAEcD09dC88958378780FB62";
    const CONTRACT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"nonce","type":"uint256"}],"name":"RegistrationFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"nonce","type":"uint256"}],"name":"RegistrationSuccessful","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"string","name":"owner","type":"string"},{"internalType":"string","name":"delegate","type":"string"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"delegate","type":"string"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenOwner","type":"string"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"user","type":"string"},{"internalType":"uint256","name":"nonce","type":"uint256"}],"name":"registerUser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"receiver","type":"string"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"owner","type":"string"},{"internalType":"string","name":"buyer","type":"string"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    const provider = ethers.getDefaultProvider("ropsten");
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    const tx: PopulatedTransaction = await contract.populateTransaction.registerUser('0x1814727b5bE9286978c04EED5D64eAEAb00Fd145', 900);
    console.log(tx);
    const payload: TransactionArguments = {
        assetId: 'ETH_TEST',
        source: {
            type: PeerType.VAULT_ACCOUNT,
            id: '0'
        },
        destination: {
            type: PeerType.EXTERNAL_WALLET,
            id: '#Eternal_Wallet_Id',
        },
        amount: String(0),
        fee: '0.001',
        failOnLowFee: false,
        operation: TransactionOperation.CONTRACT_CALL,
        note: "Created by fireblocks SDK",
        extraParameters: {
            contractCallData: tx.data
        }
    };
    const data =  await fireblocks.createTransaction(payload);
    txId = data.id;
    console.log(data);
}

const getMaxSpendableAmount = async (vaultAccountId, assetId) => {
    const address = await fireblocks.getMaxSpendableAmount(vaultAccountId, assetId);
    console.log(address);
}

const getTransaction = async (txId) => {
    const tx = await fireblocks.getTransactionById(txId);
    console.log(tx);
}

const transactionList = async () => {
    const data = await fireblocks.getTransactions({});
    console.log(data);
}

const createVaultAccount = async (name, customerRefId) => {
    const vaultAccount = await fireblocks.createVaultAccount(name, false, customerRefId, true);
    console.log(vaultAccount);
}

const listVault = async () => {
    const vaultAccounts = await fireblocks.getVaultAccounts();
    for (let vault of vaultAccounts) {
        console.log(vault);
    }
}

const getVaultAccount = async (vault_account_id) => {
    const vaultAccount = await fireblocks.getVaultAccount(vault_account_id);
    console.log(vaultAccount);
}

const vaultAssetBalance = async (vaultAccountId, assetId) => {
    const vaultAsset = await fireblocks.getVaultAccountAsset(vaultAccountId, assetId);
    console.log(vaultAsset);
}

const refreshVaultAssetBalance = async (vaultAccountId, assetId) => {
    const vaultAsset = await fireblocks.refreshVaultAssetBalance(vaultAccountId, assetId);
    console.log(vaultAsset);
}

const getDepositAddresses = async (vaultAccountId, assetId) => {
    const depositAddresses = await fireblocks.getDepositAddresses(vaultAccountId, assetId);
    console.log(depositAddresses);
}

const createVaultAsset = async (vaultAccountId, assetId, address) => {
    const vaultAsset = await fireblocks.createVaultAsset(vaultAccountId, assetId, address);
    console.log(vaultAsset);
}

const generateNewVaultAddress = async (vaultAccountId, assetId, customerRefId) => {
    const address = await fireblocks.generateNewAddress(
        vaultAccountId, 
        assetId, 
        '', 
        customerRefId
    );
    console.log(address);
}

const getNetworkConnections = async () => {
    const networkConnections = await fireblocks.getNetworkConnections();
    console.log(networkConnections);
}

const retrieveVaultPublicKey = async () => {
    const PublicKeyInfoForVaultAccountArgs = {
        assetId: 'ETH_TEST',
        vaultAccountId: 0,
        change: 5,
        addressIndex: 5
    }
    const pubKey = await fireblocks.getPublicKeyInfoForVaultAccount(PublicKeyInfoForVaultAccountArgs);
    console.log(pubKey);
}

const getPublicKeyInfo = async () => {
    const PublicKeyInfoArgs = {
        algorithm: 'MPC_ECDSA_SECP256K1',
        derivationPath: '[44,0,0,0,0]'
    }
    const pubKey = await fireblocks.getPublicKeyInfo(PublicKeyInfoArgs);
    console.log(pubKey);
}

const createExternalWallet = async (name, customerRefId) => {
    const externalWallet = await fireblocks.createExternalWallet(name, customerRefId);
    console.log(externalWallet);
}

const addExternalWalletAsset = async (id, assetId, address, tag) => {
    const externalWalletAsset = await fireblocks.createExternalWalletAsset(id, assetId, address, tag);
    console.log(externalWalletAsset);
}

const externalWallets = async () => {
    const externalWallets = await fireblocks.getExternalWallets();
    for (let wallet of externalWallets) {
        console.log(wallet);
    }
}

const internalWallets = async () => {
    const internalWallets = await fireblocks.getInternalWallets();
    for (let wallet of internalWallets) {
        console.log(wallet);
    }
}

const createInternalWallet = async (name, customerRefId) => {
    const internalWallet = await fireblocks.createInternalWallet(name, customerRefId);
    console.log(internalWallet);
}

const createInternalWalletAsset = async (walletId, assetId, address) => {
    const internalWalletAsset = await fireblocks.createInternalWalletAsset(walletId, assetId, address);
    console.log(internalWalletAsset);
}

const supportedAssets = async () => {
    const supportedAssets = await fireblocks.getSupportedAssets();
    console.log(supportedAssets.filter(asset => asset.nativeAsset === 'ETH_TEST'));
}

const setAddressDescription = async (vaultAccountId, assetId, addressId) => {
    const address = await fireblocks.setAddressDescription(vaultAccountId, assetId, addressId);
    console.log(address);
}

const validateAddress = async (assetId, address) => {
    const result = await fireblocks.validateAddress(assetId, address);
    console.log(result);
}

const getFeeForAsset = async (assetId) => {
    const feeResult = await fireblocks.getFeeForAsset(assetId);   
    console.log(feeResult);
}

const setCustomerRefIdForAddress = async (vaultAccountId, assetId, addressId, customerRefId) => {
    const vaultAsset = await fireblocks.setCustomerRefIdForAddress(vaultAccountId, assetId, addressId, customerRefId);
    console.log(vaultAsset);
}

txId = txId || 'd813b1e5-a6f8-4881-ae16-630f00928ed1';

const main = async () => {
  try {
    //await getFeeForAsset('ETH_TEST');
    //await createTransaction();
    //await createContractTx();
    //await getTransaction(txId);
    //await getNetworkConnections();
    await transactionList();
    //await createVaultAccount('vault-wallet-321489', 'vault-321489')
    //await listVault();
    //await getVaultAccount('1');
    //await vaultAssetBalance('0', 'ETH_TEST');
    //await refreshVaultAssetBalance('0', 'ETH_TEST');
    //await getDepositAddresses('4', 'ETH_TEST');
    //await generateNewVaultAddress('0', 'BNB_TEST', 'int-413892');
    //await getMaxSpendableAmount(0, 'ETH');
    //await retrieveVaultPublicKey();
    //await getPublicKeyInfo();
    //await createVaultAsset('6', 'ETH_TEST', '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e');
    //await createExternalWallet('ext-wallet-348659', 'ext-348659');
    //await addExternalWalletAsset('b7421684-da8a-c092-7a9a-cc1242f32f80', 'ETH_TEST', '0xdacD69347dE42baBfAEcD09dC88958378780FB62', 'Ethereum ropsten address');
    //await externalWallets();
    //await createInternalWallet('test_eth', 'int_384524');
    //await createInternalWalletAsset('9e7deb28-f1a9-1ad2-2375-1abd1f6705d0', 'BTC_TEST', '0x1180807C3C483a3d1767104432dC1E78018d35F9')
    //await setCustomerRefIdForAddress('0', 'ETH_TEST', '0xc7d997fF29040bbD040B147106e536e8443D060A', 'int_384524');
    //await internalWallets();
    //await supportedAssets();
    //await setAddressDescription('0', 'ETH_TEST', 'd30d79e1-9cb7-a82f-d663-cbd2b04e3d12')
    //await validateAddress('ETH', '0xD6D6E6bFb7932e38f200206585682023B1319e2b')
  } catch (err) {
      console.log(err);
  }
}

main();