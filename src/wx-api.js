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

            // console.log(dataJson)

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
                    // openid: "oVeG45UgIY-e-2YS4LsqBv38ipoM"
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

    let token = jwt.verify(req.body.uuId,secret)

    let params = {
        // uuId : "",
        nickName: "",
        province: "",
        city : "",
        gender : "",
        avatarUrl : "",
    }

    Object.assign(params, req.body)

    if (params.gender === 1){
        params.gender = '男'
    }else {
        params.gender = '女'
    }

    // return resMsg(res, params)

    wxUserInfo.findOne({
        include:[{
            model : wxUser,
            as : 'wxuser',
            attributes: ['uuId']
        }],
        where :{
            uuId : token.uuId,
        }
    }).then(rest =>{
        params.uuId = token.uuId
        // token已存在 修改token

        // return resMsg(res, rest)

        if (rest){
            console.log("token已存在")
            // return resMsg(res, "token已存在")
            wxUserInfo.update(params,{
                silent: false,
                where : {
                    id : rest.id
                }
            }).then(restl =>{
                return resMsg(res, restl)
            }).catch(err=>{
                return resMsg(res, err)
            })

        }else {
            console.log("token不存在")
            // return resMsg(res, "token不存在")
            wxUserInfo.create(params)
            .then(restl =>{
                return resMsg(res, restl)
            }).catch(err=>{
                return resMsg(res, err)
            })
        }

    }).catch(err=>{
        return resMsg(res, err)
    })


    // wxUserInfo.findAll({
    //     attributes: ['uuId','nickName','province'],
    //     include:[{
    //         model : wxUser,
    //         as : 'data',
    //         attributes: ['uuId']
    //     }],
    //     where : {
    //         uuId : token,
    //         // '$data.uuId$': token
    //     },
    //     // raw:true
    // }).then(rest =>{
    //     return resMsg(res, rest)
    // })


}

module.exports = {
    wxLogin,
    wxSetUserInfo
}