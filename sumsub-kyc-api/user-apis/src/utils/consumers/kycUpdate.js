const kafka = require('../../config/kafka');
const db = require('../../models');
const { consumerGroups, webhookTypes } = require('../common/enum');

const topics = [
  webhookTypes.applicantCreated, 
  webhookTypes.applicantReviewed, 
  webhookTypes.applicantPending
];

const Users = db.users;
const KYC = db.kyc;
kafka.consumerInit({ groupId: consumerGroups.kyc });

const run = async () => {
  try {
    const { topic, message } = await kafka.receiverMessage({ topics });
    try {
      const data = JSON.parse(message.value.toString());
      const { externalUserId = '' } = data;
      const user = await Users.findByPk(externalUserId);
      if (user) {
        const kycData = { userId: externalUserId, [topic]: data };
        const filter = { where: { userId: externalUserId }};
        const kyc = await KYC.findOne(filter);
        if (kyc && kyc.dataValues) {
          kycData.id = kyc.dataValues.id; 
          await KYC.update(kycData, filter);
        } else {
          console.log(kycData);
          await KYC.create(kycData);
        }
      }
    } catch (err) {
      throw err;
    }
  } catch(err) {
    console.error(err);
  }
}

run();