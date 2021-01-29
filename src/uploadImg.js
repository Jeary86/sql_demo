/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2021/1/29 06:38
 */
const multer = require("multer");
const { resEmp } = require('../utils/response');
let path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        let singfileArray = file.originalname.split('.');
        let fileExtension = singfileArray[singfileArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + "." + fileExtension);
    }
})

let uploader = multer({ storage: storage }).single("file");


const uploadImg = async function (req, res) {

    uploader(req, res,()=> {

        if (req.file){
            const basename = path.basename(req.file.path)
            const originUrl = req.headers.host

            let file_url

            if (process.env.NODE_ENV === 'development'){

                file_url = 'http://' + originUrl +'/uploads/' + basename

            }else {
                file_url = 'https://' + originUrl +'/server/public/uploads/' + basename
            }

            res.send({file:file_url})
        }else {
            resEmp(res);
        }

    });

}

module.exports = uploadImg