/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/29 23:03
 */

const { resFun , resSuc } = require('../utils/response');
const Works = require('../models/works')

const uploadWorks = async function (req, res) {

    let params = {
        w_title: '',
        w_link: ''
    }

    Object.assign(params, req.body)

    Works.create(params)
        .then(data =>{

            // console.log(data)

            return resSuc(res, '提交');

        })
        .catch(err =>{
            return resFun(res, 1)
        })

}

const worksList = async function (req, res) {

    let page = req.query.page || 1
    let limit = req.query.limit || 10

    const params = {
        page : parseInt(page),
        limit : parseInt(limit)
    }

    Works.findAndCountAll({
        limit: params.limit,
        offset: params.limit * (params.page - 1),
    }).then(rest =>{
        return resSuc(res,rest);
    })


}

module.exports = {
    uploadWorks,
    worksList
}