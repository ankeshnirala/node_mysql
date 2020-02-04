const Connection = require('./../databases/connection');

let Tour = function(tour){
    this.tour_name = tour.tour_name;
    this.duration = tour.duration;
    this.price = tour.price;
    this.rating = tour.rating;
    this.max_group_size = tour.max_group_size;
    this.summary = tour.summary;
    this.description = tour.description;
    this.image = tour.image;
    this.status = tour.status;
};

Tour.save = (tour) => {
    let query = `INSERT INTO tours SET ?`;
    return Connection.query(query, tour);
};

Tour.findAll = (queryString) => {

    let query = `SELECT * FROM tours LIMIT ${queryString.limit} OFFSET ${queryString.offset}`;
    return Connection.query(query);
};

Tour.findById = (id) => {
    let query = `SELECT * FROM tours WHERE id = ?`;
    return Connection.query(query, id);
};

Tour.updateById = (tour, id) => {
    
    let query = `UPDATE tours SET ? WHERE id = ?`;
    return Connection.query(query, [tour, id]);
};

Tour.deleteById = (id) => {
    
    let query = `UPDATE tours SET status = 'D' WHERE id = ?`;
    return Connection.query(query, id);
};

module.exports = Tour;