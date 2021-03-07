/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/29 07:00
 */

const Sequelize = require('sequelize')
let mysql = require('./index')
let moment = require('moment');
const myCrypto = require('../utils/crypto');

const User = mysql.define('user', {
    user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    // user_uuid: {
    //     type: Sequelize.UUID,
    //     defaultValue: Sequelize.UUIDV4,
    //     primaryKey: true
    // },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_role : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
});




// User.sync({ alter: true }); //更新字段信息

// User.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return User.create({
//         user_name : 'admin',
//         user_password : myCrypto('admin'),
//         user_role : 1
//     })
// });

module.exports = User