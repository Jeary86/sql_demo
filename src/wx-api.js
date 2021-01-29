/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/28 23:56
 */
const request = require('request');
const config = require('../config/config')
const wxUser = require('../models/wxuser')
const jwt = require('jsonwebtoken');
const secret = require('../utils/jwtKey')
const { resFun , resSuc , resMsg } = require('../utils/response');

const wxLogin = async function (req, res) {

    const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+ config.wxKey.APPID +'&secret='+ config.wxKey.SECRET +'&js_code='+ req.query.code +'&grant_type=authorization_code'

    request(apiUrl,async function (err,data,req) {
        if(!err){

            let data = JSON.parse(req)

            let params = {
                openid: "081a0i0w3dSGKV2W344w3Aw",
                session_key: "081a0i0w3dSGKV2W344w3Aw",
            }

            wxUser.findOne({
                where: {
                    openid: "081a0i0w3dSGKV2W344w3Aw"
                }
            }).then(rest => {

                if(!rest) {

                    console.log("数据库没有相对的openid")

                    wxUser.create({
                        uuid: require('../utils/util').uuid,
                        openid: params.openid,
                        session_key: params.session_key
                    }).then(resul =>{

                        let userInfo={
                            uuid: resul.uuid
                        }

                        let token = jwt.sign(userInfo,secret, { expiresIn: '1day' })


                        console.log('添加token成功:' + userInfo.uuid)

                        res.json({token: token})

                        delete require.cache[require.resolve("../utils/util")]

                    }).catch(err => {
                        // console.log(err)
                        return resMsg(res, err)
                    })

                }else {

                    let userInfo={
                        uuid: rest.uuid
                    }

                    console.log("用户已存在:" + userInfo.uuid)

                    const token = jwt.sign(userInfo, secret, { expiresIn: '1day' })
                    res.json({token: token})
                }

            }).catch(err=>{
                // console.log(err)
                return resMsg(res, "接口错误")
            })


        }
    })
}

module.exports = {
    wxLogin
}