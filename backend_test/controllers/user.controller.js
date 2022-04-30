var User = require('../models/user.model');

exports.api_user = function(req, res){
    User.get_all(function(data){
        res.send({result: data});
    });

    
}

exports.detail = function(req,res){
    var data = User.getById(req.params.user_id);

    res.send({result: data});
}