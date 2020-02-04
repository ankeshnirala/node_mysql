const connection = require('./../databases/connection');

let User = function(user) {
    this.f_name = user.f_name;
    this.l_name = user.l_name;
    this.username = this.f_name+this.l_name;
    this.email = user.email;
    this.password = user.password;
    this.status = user.status;
};

User.create = (user) => {
    let query = `INSERT INTO users SET ?`;
    return connection.query(query, user);
};

User.findAll = () => {
    let query = `SELECT * FROM users`;
    return connection.query(query);
};

User.findById = () => {

};

User.updateById = () => {

};

User.deleteById = () => {

};

module.exports = User;