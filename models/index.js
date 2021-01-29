'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];


const sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
    timezone: '+08:00',
    //全局设置取消时间戳
    define:{
        timestamps:true
    }
});
sequelize.authenticate()
    .then(() => {
        console.log('数据库连接成功:' + config.host);
    })
    .catch(err => {
        console.error('无法连接到数据库:', err);
    });

// sequelize.sync()
//     .then(() => {
//         console.log('init db ok')
//     })
//     .catch(err => {
//         console.log('init db error', err)
//     })

module.exports = sequelize