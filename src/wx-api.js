/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/28 23:56
 */
const request = require('request');
const config = require('../config/config')
const { wxUser , wxUserInfo } = require('../models/wxuser')
const jwt = require('jsonwebtoken');
const secret = require('../utils/jwtKey')
const { resFun , resSuc , resMsg } = require('../utils/response');

const wxLogin = async function (req, res) {

    const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+ config.wxKey.APPID +'&secret='+ config.wxKey.SECRET +'&js_code='+ req.query.code +'&grant_type=authorization_code'

    request(apiUrl,async function (err,data,req) {
        if(!err){

            let dataJson = JSON.parse(req)

            // console.log(data)

            // let params = {
            //     openid: "oVeG45UgIY-e-2YS4LsqBv38ipoM",
            //     session_key: "1hgWf/U/lsLOSxMLNEUJZw==",
            // }

            let params = {
                openid: dataJson.openid,
                session_key: dataJson.session_key,
            }


            // return resMsg(res, params)

            wxUser.findOne({
                where: {
                    openid:dataJson.openid
                }
            }).then(rest => {

                if(!rest) {

                    console.log("数据库没有相对的openid")

                    wxUser.create({
                        uuId: require('../utils/util').uuid,
                        openid: params.openid,
                        session_key: params.session_key
                    }).then(resul =>{

                        let userInfo={
                            uuId: resul.uuId
                        }

                        let token = jwt.sign(userInfo,secret, { expiresIn: '1day' })


                        console.log('添加token成功:' + userInfo.uuId)

                        res.json({token: token})

                        delete require.cache[require.resolve("../utils/util")]

                    }).catch(err => {
                        // console.log(err)
                        return resMsg(res, err)
                    })

                }else {

                    let userInfo={
                        uuId: rest.uuId
                    }

                    console.log("用户已存在:" + userInfo.uuId)

                    const token = jwt.sign(userInfo, secret, { expiresIn: '1day' })
                    res.json({token: token})
                }

            }).catch(err=>{
                // console.log(err)
                return resMsg(res, err)
            })


        }
    })
}

const wxSetUserInfo = async function(req,res){
    let params = {
        nickName: "",
        province: "",
        city : "",
        gender : "",
        avatarUrl : "",
    }

    Object.assign(params, req.body)

    console.log(params.gender)

    if (params.gender === '1'){
        params.gender = '男'
    }else {
        params.gender = '女'
    }

    // wxUserInfo.create(params)
    // .then(resul =>{
    //     return resMsg(res, resul)
    // })

    wxUserInfo.findAll({
        attributes: ['uuId','nickName','province'],
        include:[{
            model : wxUser,
            as : 'data',
            attributes: ['openid']
        }],
        where : {
            // nickName : 'jeary',
            '$data.id$': 1
        },
        // raw:true
    }).then(rest =>{
        return resMsg(res, rest)
    })


}

module.exports = {
    wxLogin,
    wxSetUserInfo
}