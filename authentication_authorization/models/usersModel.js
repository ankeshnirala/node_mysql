const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Connection = require('./../databases/connection');

let User = function(user){
    this.username = user.username;
    this.role = user.role;
    this.email = user.email;
    this.mobile = user.mobile;
    this.password = user.password;
    this.status = user.status;
};

User.save = (user) => {
    let query = `INSERT INTO users SET ?`;
    return Connection.query(query, user);
};

User.findAll = () => {
    let query = `SELECT * FROM users`;
    return Connection.query(query);
};

User.findOne = (user) => {
    let query = `SELECT id, email, password FROM users WHERE email=? AND status='A'`;
    return Connection.query(query, user);
};

User.findById = (id) => {
    let query = `SELECT * FROM users WHERE id = ? AND status='A'`;
    return Connection.query(query, id);
};

User.updateById = (user, key, id) => {
    let _user = [];
    user.forEach(data => {
        _user.push([data]);
    });
    
    let query = `UPDATE users SET ${key} WHERE id = ${id}`;
    
    return Connection.query(query, _user);
};

User.deleteById = (id) => {
    let query = `UPDATE users SET status = 'D' WHERE id = ?`;
    return Connection.query(query, id);
};

//password_reset

User.saveInPasswordReset = (data) => {
    return Connection.query(`INSERT INTO password_reset SET ?`, data);
};

User.getPasswordReset = (id) => {
    return Connection.query(`SELECT * FROM password_reset WHERE user_id=? AND status='A'`, id);
};

User.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};

User.changedPasswordAfter = async (passwordChangedAt, JWTTimestamp) => {
    let changedTimestamp = parseInt(passwordChangedAt.getTime()/1000, 10);
    if(passwordChangedAt){
        return JWTTimestamp < changedTimestamp;
    }

    //false means password not changed
    return false;
};

User.createPasswordResetToken = async () => {
    let resetToken = crypto.randomBytes(32).toString('hex');

    let passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    let passwordResetExpires = Date.now() + 10*60*1000;
    
    return {
        resetToken: resetToken,
        passwordResetToken: passwordResetToken,
        passwordResetExpires: passwordResetExpires
    };
};

module.exports = User;