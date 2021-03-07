/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/31 08:33
 */

const { test , products ,testSort } = require('../models/test')
const jwt = require('jsonwebtoken');
const secret = require('../utils/jwtKey')

const getTest = async function(req,res){

    // res.json({
    //     msg: req.query.id
    // })


    products.findAll({
        attributes: ['prdId','prdName', 'price'],
        include: [{
            model: test,
            as: 'test',
            // attributes: ['userName']
        }],
        // where : {
        //     prdId : req.query.id
        // }
        //raw:true
    }).then(result => {
        res.json({
            msg: result
        })
    }).catch(err => {
        console.log(err)
    })

}

const setTest1 = async function(req,res){

    let params = {
        userName: "",
        birthDay: "",
        gender : "",
    }

    Object.assign(params, req.body)

    test.create(params)
    .then(resul =>{
        res.json({
            msg: resul
        })
    })


}
const setTest2 = async function(req,res){
    let params = {
        prdName: "",
        userId: "",
        price : "",
    }

    Object.assign(params, req.body)

    products.create(params)
        .then(resul =>{
            res.json({
                msg: resul
            })
        })
}

const testToken = async function(req,res){

    let token = jwt.verify(req.query.token,secret)

    res.json({
        msg: token
    })
}

const testSetSort = async function(req,res){

    let params = {
        name : req.body.name,
        sort : 0
    }


    testSort.findAll({order:[['id','DESC']],limit:1}).then(resul =>{

        params.sort = resul[0].id

        params.sort +=1

        testSort.create(params)
            .then(resul =>{

                res.json({
                    msg: resul
                })

            })

    }).catch(err => {

        params.sort +=1

        testSort.create(params)
            .then(resul =>{

                res.json({
                    msg: resul
                })

            })
    })

}

const testGetList = async function(req,res){

    testSort.findAll({
        order: [['sort','DESC']],
    }).then(resul =>{
        res.json({
            msg: resul
        })
    })

}

module.exports = {
    getTest,
    setTest1,
    setTest2,
    testToken,
    testSetSort,
    testGetList
}