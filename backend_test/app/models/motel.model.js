const db = require('../common/connect')

const Motel = function(motel){
    this.motel_id = motel.motel_id;
    this.src = motel.src;
    this.title = motel.title;
    this.descr = motel.descr;
    this.price = motel.price;
    this.area = motel.area;
    this.location = motel.location;
    this.createdAt = motel.createdAt;
}

Motel.get_all = function(result){
    db.query("SELECT * FROM motel", function(err, motel)
    {
        if (err) return(null);
        else result(motel);
    });
}

// User.getById = function(id){
//     var data = {"user_id": id, "user_name":"user1"};

//     return data;
// }

module.exports = Motel;