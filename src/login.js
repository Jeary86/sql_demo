/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/29 07:09
 */

const { resFun , resSuc } = require('../utils/response');
const User = require('../models/user')
const myCrypto = require('../utils/crypto');
const jwt = require('jsonwebtoken');
const secret = require('../utils/jwtKey')

const login = async function (req, res) {

    let params = {
        user_name: '',
        user_password: ''
    }

    Object.assign(params, req.body)
    params.user_password = myCrypto(params.user_password);

    User.findOne({
        where:{
            user_name : params.user_name,
            user_password : params.user_password
        }
    }).then(rest =>{

        if (rest) {
            // console.log('登录成功',params)

            req.session.token = jwt.sign(params, secret, { expiresIn: 86400 });

            return resSuc(res, '登录成功，返回token')

        }else {
            return resFun(res, 10003);
        }
    }).catch(err=>{
        return resFun(res, 1)
    })
}

const clearUser = async function (req, res) {
    if (req.session.token){
        req.session.destroy()
        return resSuc(res, "退出登录");
    }else {
        return resFun(res, 20000)
    }
}

const userInfo = async function (req, res) {

    if (req.session.token){
        let userInfo = jwt.verify(req.session.token,secret)
        return resSuc(res, {
            user_name : userInfo.user_name
        });
    }else {
        return resFun(res, 20000)
    }

}


module.exports = {
    login,
    clearUser,
    userInfo
};