const Connection = require('./../databases/connection');

let Tour = function(tour){
    this.name = tour.name;
    this.price = tour.price;
    this.duration = tour.duration;
    this.group_size = tour.group_size;
    this.status = tour.status;
};

Tour.save = (tour) => {
    let query = `INSERT INTO tours SET ?`;
    return Connection.query(query, tour);
};

Tour.findAll = () => {
    let query = `SELECT * FROM tours`;
    return Connection.query(query);
};

Tour.findById = (id) => {
    let query = `SELECT * FROM tours WHERE id = ?`;
    return Connection.query(query, id);
};

Tour.updateById = (tour, key, id) => {
    let _tour = [];
    user.forEach(data => {
        _tour.push([data]);
    });
    let query = `UPDATE tours SET ${key} WHERE id = ${id}`;
    return Connection.query(query, _tour);
};

Tour.deleteById = (id) => {
    let query = `UPDATE tours SET status = 'D' WHERE id = ?`;
    return Connection.query(query, id);
};

module.exports = Tour;