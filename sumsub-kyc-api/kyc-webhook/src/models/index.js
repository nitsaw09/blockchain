const  { Sequelize, DataTypes, Op } = require('sequelize');
const { DB_DIALECT, DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env; 

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection Successfully');
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

db.kyc = require('./kyc')(sequelize, DataTypes);

db.sequelize.sync({ alter: true })
.then(() => {
    console.log('Db connected');
})
.catch(err => {
    console.log('Error: ', err.message);
});

module.exports = db;