module.exports = function(router){
    var userController = require('../controllers/user.controller')

    router.get('/api_user', userController.api_user);

    router.get('/api_user/detail/:user_id', userController.detail);

    router.post('/api_user/add_user', userController.add_user);

    router.delete('/api_user/delete_user/:user_id', userController.delete_user_by_id);

    router.put('/api_user/update_user', userController.update_user);
};