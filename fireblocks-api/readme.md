# Fireblocks
Fireblocks (https://www.fireblocks.com/) is a digital asset security platform that offers an enterprise-grade solution for the storage, transfer, and issuance of cryptocurrencies and other digital assets. Following are the points to explain what Fireblocks is:

1. Fireblocks is a secure digital asset management platform that enables institutions to securely store, transfer, and issue digital assets.
2. It provides a secure infrastructure that allows institutions to easily and securely move funds and digital assets across multiple exchanges, wallets, and custodians.
3. Fireblocks' platform uses advanced cryptography and multi-layer security protocols to protect digital assets from theft, fraud, and cyber-attacks.
4. The platform is designed for institutional investors, banks, exchanges, and other financial service providers who require a secure, compliant, and scalable solution for managing digital assets.
5. Fireblocks' platform supports a wide range of digital assets, including Bitcoin, Ethereum, and other cryptocurrencies, as well as stablecoins and security tokens.
6. Fireblocks' platform provides a single point of integration for institutions to access multiple exchanges, wallets, and custodians, streamlining the transfer process and reducing the risk of errors.
7. The platform also provides an API that allows developers to integrate their applications with Fireblocks' infrastructure, enabling them to securely manage digital assets.
8. Fireblocks' platform is compliant with leading regulatory frameworks, such as GDPR, SOC 2, and PCI DSS, ensuring that institutions can operate with confidence and meet regulatory requirements.
9. The platform offers a range of features, such as multi-user access control, audit logs, and real-time monitoring, which enable institutions to manage and monitor their digital assets securely.
10. Fireblocks' platform has been recognized for its innovation and security, winning multiple awards and receiving positive feedback from customers for its ease of use and advanced security features.

## requirements
1. Node >= v15.0.0
2. Typescript
3. OpenSSL

## Fireblocks API
To create transactions on the Fireblocks platform and view information regarding your vault accounts, FIAT accounts, connected wallets, exchanges, and network connections
Fireblocks offer SDKs in Python and JavaScript. You can see the API documents on https://docs.fireblocks.com/api/?javascript#rest-api

### Fireblocks API Credentials
To create the fireblocks user api csr file is required which is created using the following command
- Run the following command line to generate an RSA 4096 private key (stored in fireblocks_secret.key):
  ```openssl req -new -newkey rsa:4096 -nodes -keyout fireblocks_secret.key -out fireblocks.csr```
- Make sure you keep the Fireblocks API secret key safe and secure! 
For adding api user refer this article - https://support.fireblocks.io/hc/en-us/articles/4407823826194-Adding-new-API-users


## setup
This is test repo for testing the fireblocks apis
1. Add the ```fireblocks_secret.key``` file created by above openssl command in root
2. Add the fireblocks user api key in ```test.ts``` file
3. ```npm install```
4. run the test file ```npm start```