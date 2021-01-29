/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/29 22:57
 */

const Sequelize = require('sequelize')
let mysql = require('./index')

const Works = mysql.define('works', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    w_title: {
        type: Sequelize.STRING
    },
    w_link: {
        type: Sequelize.STRING
    },
    // w_content:{
    //     type: Sequelize.TEXT
    // },
    // w_img_url: {
    //     type: Sequelize.STRING
    // },
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

// Works.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });

module.exports = Works