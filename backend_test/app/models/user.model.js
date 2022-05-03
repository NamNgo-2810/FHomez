const User = function(user){
    this.user_id = user.id;
    this.user_name = user.name;
}

User.get_all = function(result){
    var data = [
        {"user_id": 1, "user_name":"user1"},
        {"user_id": 3, "user_name":"user3"},
        {"user_id": 2, "user_name":"user2"}
    ];

    result(data);
}

User.get_by_id = function(id){
    var data = {"user_id": id, "user_name":"user1"};

    return data;
}

User.create = function(data, result){
    result(data);
}

User.delete = function(user_id, result){
    result("Delete with id " + user_id + " Success!");
}

User.update_user = function(data, result){
    result(data);
}

module.exports = User;