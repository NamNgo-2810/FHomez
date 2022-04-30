module.exports = function(router){
    var userController = require('../controllers/user.controller')


    router.get('/api_user', userController.api_user);
    router.get('/api_user/detail/:user_id', userController.detail);
    
};