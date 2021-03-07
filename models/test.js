/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/31 08:29
 */

const {Sequelize , DataTypes } = require('sequelize')
let mysql = require('./index')

const test = mysql.define('test', {
    testId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    timestamps : false,
})

const products = mysql.define('product', {
    prdId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prdName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    testId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: false
    }
},{
    timestamps : false,
})

products.belongsTo(test, { foreignKey: 'testId', targetKey: 'testId', as: 'test' });

// test.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });
// //
// products.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });

const testSort = mysql.define('test_sort', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sort: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
},{
    timestamps : false,
})

// testSort.sync({force: true}).then(() => {
//     // 表已创建
//     console.log('创建表')
//     return;
// });

module.exports = {
    test,
    products,
    testSort
}