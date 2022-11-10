module.exports = (sequelize, DataTypes) => {
    const kyc = sequelize.define('kyc', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        applicantCreated: {
            type: DataTypes.JSONB
        },
        applicantReviewed: {
            type: DataTypes.JSONB
        },
        applicantPending: {
            type: DataTypes.JSONB
        }
    },
    {
        indexes: [
            {
                fields: ['applicantCreated'],
                using: 'gin',
                operator: 'jsonb_path_ops'
            },
            {
                fields: ['applicantReviewed'],
                using: 'gin',
                operator: 'jsonb_path_ops'
            },
            {
                fields: ['applicantPending'],
                using: 'gin',
                operator: 'jsonb_path_ops'
            }
        ],
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    })

    return kyc;
}