const { wxLogin } = require('../src/wx-api')
const uploadImg = require('../src/uploadImg')
const { register , delUser , updateUser } = require('../src/register')
const { login , clearUser , userInfo } = require('../src/login');
const { uploadWorks , worksList } = require('../src/works');

const routers = (router) => {

    /** 首页 **/
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    /** 微信登录获取token **/
    router.get('/wxLogin',wxLogin);

    /** 登录 **/
    router.post('/login', login);

    /** 登录验证 **/
    router.get('/userInfo', userInfo);

    /** 添加用户 **/
    router.post('/register', register);

    /** 修改用户名密码 **/
    router.post('/updateUser', updateUser);

    /** 删除用户 **/
    router.post('/delUser', delUser);

    /** 退出登录 清除session **/
    router.get('/clearUser', clearUser);

    /** 上传图片 **/
    router.post('/uploadImg', uploadImg);

    /** 上传作品 **/
    router.post('/uploadWorks', uploadWorks);

    /** 作品列表 **/
    router.get('/worksList', worksList);

    return router;


}

module.exports = routers;
