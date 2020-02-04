module.exports = err => {
    return (req, res, next) => {
        err(req, res, next).catch(next);
    };
};