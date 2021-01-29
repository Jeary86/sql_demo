const list = require('./white-list');
// 跨域白名单设置

const header = function(req, res, next) {

    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", list);
    res.header("Access-Control-Allow-Headers", "Content-Type, authorization, Cache-Control");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
};

module.exports = header;