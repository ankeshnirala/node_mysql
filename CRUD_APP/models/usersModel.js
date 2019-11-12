const db = require('./../databases/database');

const User = function(user){
    this.id = user.id
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
};

User.saveUser = (newUser) => {
    const query = `INSERT INTO users SET ?`;
    return db.query(query, newUser);
}

User.fetchAllUser = () => {
    const query = `SELECT * FROM users`;
    return db.query(query);
}

User.fetchUserById = (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    return db.query(query, id);
};

User.updateUserById = (newUser, id) => {
    const query = `UPDATE users SET ? WHERE id = ?`;
    return db.query(query, [newUser, id]);
}

User.deleteUserById = (id) => {
    const query = `DELETE FROM users WHERE id = ?`;
    return db.query(query, id);
}

module.exports = User;