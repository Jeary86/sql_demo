/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/31 13:59
 */

const config = require('../config/config')
const sha1 = require('sha1');

const waChat = async function (req,res) {

    let signature = req.query.signature,//微信加密签名
        timestamp = req.query.timestamp,//时间戳
        nonce = req.query.nonce,//随机数
        echostr = req.query.echostr;//随机字符串

    //2.将token、timestamp、nonce三个参数进行字典序排序
    let array = [config.wechat.token, timestamp, nonce];
    array.sort();

    //3.将三个参数字符串拼接成一个字符串进行sha1加密
    let tempStr = array.join('');

    // res.send(nonce);

    let resultCode = sha1(tempStr); //对传入的字符串进行加密

    //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
        res.send(echostr);
    } else {
        res.send('mismatch');
    }
}

module.exports = {
    waChat
}