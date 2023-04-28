const express = require("express");
const router = express.Router();
const db = require('../models');
const kafka = require('../config/kafka');
const KYC = db.kyc;

kafka.producerInit();

const kycUpdate = async ({ webhookType, data = {} }) => {
    try {
        //data = { externalUserId: 'd0c863c8-1a3d-478b-9335-263fadd2fd8e' }
        const { externalUserId = '' } = data;
        if (externalUserId) {
            const kycData = { userId: externalUserId, [webhookType]: data };
            const filter = { where: { userId: externalUserId }};
            const kyc = await KYC.findOne(filter);
            if (kyc && kyc.dataValues) {
                kycData.id = kyc.dataValues.id; 
                await KYC.update(kycData, filter);
            } else {
                await KYC.create(kycData);
            }
            await kafka.senderMessage({
                topic: webhookType,
                messages: [
                    { 
                        value: JSON.stringify(data) 
                    }
                ],
            });
        }    
        return;
    } catch (err) {
        console.log(err);
    }
}

/**
 * Receive the applicant created status from sumsub
 */
router.post('/applicant-created', async (req, res) => {
    console.log('Test server Response', res);
    await kycUpdate({
        webhookType: 'applicantCreated',
        data: res.body        
    });

    res.send('ok');
});

/**
 * Receive the applicant reviewed status from sumsub
 */
router.post('/applicant-reviewed', async (req, res) => {
    console.log('Test server Response', res);
    await kycUpdate({ 
        webhookType: 'applicantReviewed',
        data: res.body        
    });
    res.send('ok');
});

/**
 * Receive the applicant pending status from sumsub
 */
router.post('/applicant-pending', async (req, res) => {
    //console.log('Test server Response', res);
    await kycUpdate({ 
        webhookType: 'applicantPending',
        data: res.body        
    });
    res.send('ok');
});

module.exports = router;