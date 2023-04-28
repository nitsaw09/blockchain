const express = require("express");
const router = express.Router();
const axios = require('axios');
const { createAccessToken, getApplicantData } = require("../config/sumsub");
const db = require('../models');
const Users = db.users;

/**
 * Create access token for accessing the sumsub WebSDK for users
 */
router.post("/create-access-token", async (req, res) => {
    try {
        const { email } = req.body;
        let user = await Users.findOne({ where: { email }});
        if (!user || !user.dataValues) {
            user = await Users.create({ email });
            console.log(user.dataValues);
        }
        const levelName = 'basic-kyc-level';
        const externalUserId = user.dataValues.id;
        const createTokenApiConfig = await createAccessToken(externalUserId, levelName);
        const { data } = await axios(createTokenApiConfig);
        res.status(200).json(data);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * get the applicant details by email
 */
router.post('/user', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ where: { email }});
        if (!user || !user.dataValues) {
            throw new Error(`User not found`);
        }
        const externalUserId = user.dataValues.id;
        const getApplicantDataApiConfig = await getApplicantData(externalUserId);
        const { data } = await axios(getApplicantDataApiConfig);
        res.status(200).json(data);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;