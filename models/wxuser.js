/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/28 21:44
 */
const Sequelize = require('sequelize')
let mysql = require('./index')

const wxUser = mysql.define('wxuser', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true
    },

    openid: {
        type: Sequelize.STRING
    },
    session_key: {
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
});

// wxUser.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });

module.exports = wxUser