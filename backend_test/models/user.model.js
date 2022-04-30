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

User.getById = function(id){
    var data = {"user_id": id, "user_name":"user1"};

    return data;
}

module.exports = User;