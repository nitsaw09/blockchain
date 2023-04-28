# SUMSUB KYC API

SUMSUB WebSDK (https://sumsub.com/) for user kyc verification. This api is used to get user details and documents to verify the user identity, once the user submit the kyc details it is send to sumsub server to verify it once it is verified i.e approved or rejected it send a notification through webhook. webhook listen the response status and update in db and notify the user api about the kyc status through kafka.

# process flow
![alt text](https://gateway.pinata.cloud/ipfs/QmbAXcG8v6gMjqswejXDQhvkbCyqt2nciVe2LxNLKFx4XW)

# requirements
1. Node v15.0.0
2. Kafka
3. PostgresSQL

# setup users-api
1. got to the ```cd users-api```
2. ```npm install```
3. copy the ```.env-example``` file to ```.env``` file
4. Login to sumsub and get the api token credential and assign to .env variable ```SUMSUB_APP_TOKEN``` 

# setup kyc-webhook
1. got to the ```cd kyc-webhook```
2. ```npm install```
3. copy the ```.env-example``` file to ```.env``` file
