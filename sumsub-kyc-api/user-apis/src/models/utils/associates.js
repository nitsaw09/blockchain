module.exports = ({ db }) => {
    // user & post associates one to one
    db.kyc.hasOne(db.users, { as: 'kycData', foreignKey: 'userId', sourceKey: 'id' });
    db.users.belongsTo(db.kyc, { as: 'user', foreignKey: 'userId', sourceKey: 'id' });
}