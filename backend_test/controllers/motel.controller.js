var Motel = require('../models/motel.model');

exports.api_motel = function(req, res){
    Motel.get_all(function(data){
        res.send({result: data});
    });

    
}

// exports.detail = function(req,res){
//     var data = Motel.getById(req.params.user_id);

//     res.send({result: data});
// }