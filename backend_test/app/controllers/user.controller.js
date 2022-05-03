var User = require('../models/user.model');

exports.api_user = function(req, res){
    User.get_all(function(data){
        res.send({result: data});
    });    
}

exports.detail = function(req,res){
    var data = User.get_by_id(req.params.user_id);

    res.send({result: data});
}

exports.add_user = function(req, res){
    var data = req.body;
    User.create(data, function(response){
        res.send({result: response});
    });
}

exports.delete_user_by_id = function(req, res){
    var user_id = req.params.user_id;
    User.delete(user_id, function(response){
        res.send({result: response});
    })
}

exports.update_user = function(req, res){
    var data = req.body;
    User.update_user(data, function(response){
        res.send({result: response});
    });
}