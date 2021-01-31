/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/29 07:18
 */

const { resFun , resSuc , resMsg } = require('../utils/response');
const User = require('../models/user')
const myCrypto = require('../utils/crypto');

const register = async function (req, res) {
    let params = {
        user_name: '',
        user_password: ''
    }

    Object.assign(params, req.body);

    params.user_password = myCrypto(params.user_password);

    // console.log(req.body,req.query)

    // return resSuc(res, params)

    User.findOne({
        where:{
            user_name : params.user_name
        }
    }).then(rest =>{

        if (!rest) {
            console.log('用户名可以注册',params)

            User.create(params)
            .then(data =>{

                // console.log(data)

                return resSuc(res, '注册成功');

            })
            .catch(err =>{
                return resFun(res, 1)
            })

        }else {
            console.log('用户名已经存在',params.user_name)

            return resFun(res, 10002);
        }
    }).catch(err=>{
        return resFun(res, 1)
    })
}


const delUser = async function (req, res) {
    let params = req.body.user_id | '';

    User.destroy({
        where: {
            user_id: params
        }
    })
    .then(rest =>{

        if(rest){
            return resMsg(res, 'ok');
        }else {
            return resFun(res, 12001);
        }

    })

}

const userList = async function (req, res) {
    User.findAll()
    .then(result => {
        return resSuc(res, result)
    }).catch(err => {
        return resMsg(res, err);
    })
}

const updateUser = async function (req, res) {

    let user_id = req.body.user_id | '';

    let params = {
        user_name : '',
        user_password : ''
    };

    Object.assign(params, req.body);

    params.user_password = myCrypto(params.user_password);

    User.update(params,{
        silent: false,
        where : {
            user_id : user_id
        }
    }).then(rest =>{
        return resMsg(res, '修改成功');
    }).catch(err=>{
        return resFun(res, 1)
    })


}

module.exports = {
    register,
    delUser,
    updateUser,
    userList
};