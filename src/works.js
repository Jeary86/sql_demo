/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/29 23:03
 */

const { resFun , resSuc ,resMsg } = require('../utils/response');
const Works = require('../models/works')

const uploadWorks = async function (req, res) {

    let params = {
        w_title : '',
        w_link : '',
        w_content : '',
        w_img_url : '',
        displayTime: ''
    }

    Object.assign(params, req.body)

    Works.create(params)
        .then(data =>{

            return resSuc(res, '提交成功');

        })
        .catch(err =>{
            return resFun(res, 1)
        })

}

const worksDetailsSave = async function (req, res) {

    let workId = req.body.id | ''

    let params = {
        w_title : '',
        w_link : '',
        w_content : '',
        w_img_url : '',
        displayTime: ''
    };

    Object.assign(params, req.body);

    Works.update(params,{
        silent: false,
        where : {
            id : workId
        }
    }).then(rest =>{
        return resSuc(res, '修改成功');
    }).catch(err=>{
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

    // return resMsg(res, params);

    Works.findAndCountAll({
        limit: params.limit,
        offset: params.limit * (params.page - 1),
    }).then(rest =>{
        return resSuc(res,rest);
    }).catch(err => {
        return resMsg(res, err);
    })


}

const worksDetails = async function (req, res) {
    let params = req.query.id | '';

    Works.findAll({
        where:{
            id : params
        }
    })
    .then(result => {
        return resSuc(res, result)
    }).catch(err => {
        return resMsg(res, err);
    })
}

const delWorks = async function (req, res) {
    let params = req.body.id | ''

    Works.destroy({
        where: {
            id: params
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


module.exports = {
    uploadWorks,
    worksList,
    delWorks,
    worksDetails,
    worksDetailsSave
}