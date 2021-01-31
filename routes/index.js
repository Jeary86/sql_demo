const { wxLogin , wxSetUserInfo } = require('../src/wx-api')
const uploadImg = require('../src/uploadImg')
const { register , delUser , updateUser ,userList  } = require('../src/register')
const { login , clearUser , userInfo } = require('../src/login');
const { uploadWorks , worksList , delWorks , worksDetails , worksDetailsSave } = require('../src/works');
const { getTest , setTest1 , setTest2 ,testToken } = require('../src/test-api');
const { waChat } = require('../src/wachat')

const routers = (router) => {

    /** 首页 **/
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    /** 测试 **/
    router.get('/getTest',getTest);
    router.post('/setTest1',setTest1);
    router.post('/setTest2',setTest2);
    /** 解析token **/
    router.get('/testToken',testToken);
    /** 测试号验证 **/
    router.get('/waChat',waChat);


    /** 微信登录获取token **/
    router.get('/wxLogin',wxLogin);

    /** 微信提交用户信息 **/
    router.post('/wxSetUserInfo',wxSetUserInfo);

    /** 登录 **/
    router.post('/login', login);

    /** 登录验证 **/
    router.get('/userInfo', userInfo);

    /** 添加用户 **/
    router.post('/register', register);

    /** 用户列表 **/
    router.get('/userList', userList);

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

    /** 修改详情页 **/
    router.post('/worksDetailsSave', worksDetailsSave);

    /** 作品详情页 **/
    router.get('/worksDetails', worksDetails);

    /** 删除作品 **/
    router.post('/delWorks', delWorks);


    return router;


}

module.exports = routers;
