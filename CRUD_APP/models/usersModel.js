const db = require('./../databases/database');

const User = function(user){
    this.id = user.id
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.createUser = (newUser) => {
    const query = `INSERT INTO users SET ?`;
    return db.query(query, newUser);
}

User.getUser = () => {
    const query = `SELECT * FROM users`;
    return db.query(query);
}

User.updateUser = (newUser, id) => {
    const query = `UPDATE users SET ? WHERE id = ?`;
    return db.query(query, [newUser, id]);
}

User.deleteUser = (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    return db.query(query, id);
}

module.exports = User;