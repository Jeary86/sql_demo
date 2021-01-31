/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/31 03:41
 */

const Sequelize = require('sequelize')
let mysql = require('./index')

const wxUserInfo = new mysql.define('wxuserinfo',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    openid: {
        type: Sequelize.STRING
    },
    nickName: {
        type: Sequelize.STRING
    },
    province: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    avatarUrl: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }
})

// wxUserInfo.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });

module.exports = wxUserInfo