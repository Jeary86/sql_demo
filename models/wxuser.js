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
    uuId: {
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


const wxUserInfo = mysql.define('wxuserinfo',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    uuId: {
        type: Sequelize.UUID,
        primaryKey: true
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
    }
},{
    timestamps : false,    // 不添加时间戳
    // underscored: true      // 下换线形式
})

// wxUser.hasOne(wxUserInfo,{as : 'user'});

wxUserInfo.belongsTo(wxUser,{  foreignKey: 'uuId', targetKey: 'uuId', as: 'data' }); // 会为wxUserInfo 添加 wxUserId 属性


// wxUserInfo.belongsTo(wxUser,{
//     as: 'wxUserInfo',
//     foreginkey:"role_id",  //关联的外键
// })

// wxUser.hasOne(wxUserInfo);



// wxUser.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });
//
// wxUserInfo.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });



module.exports = {
    wxUser,
    wxUserInfo
}