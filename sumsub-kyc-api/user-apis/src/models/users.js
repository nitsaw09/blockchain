module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: { isEmail: true },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'modified_at'
    });

    return users;
}