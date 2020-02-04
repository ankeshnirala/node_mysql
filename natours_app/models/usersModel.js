const Connection = require('./../databases/connection');

let User = function(user){
    
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = this.first_name+this.last_name;
    this.email = user.email;
    this.password = user.password;
    this.status = user.status
};

User.save = (user) => {
    let query = `INSERT INTO users SET ?`;
    return Connection.query(query, user);
};

User.findAll = () => {
    let query = `SELECT * FROM users`;
    return Connection.query(query);
};

User.findById = (id) => {
    let query = `SELECT * FROM users WHERE id = ?`;
    return Connection.query(query, id);
};

User.updateById = (user, id) => {
    
    let query = `UPDATE users SET ? WHERE id = ?`;
    return Connection.query(query, [user, id]);
};

User.deleteById = (id) => {
    
    let query = `UPDATE users SET status = 'DELETE' WHERE id = ?`;
    return Connection.query(query, id);
};

module.exports = User;