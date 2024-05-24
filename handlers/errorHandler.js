const errorHandler = (error, req, res, next) => {
    if (error) {
        console.log(error);
        if (error.message) {
            res.status(400).json({
                status: "Failed",
                error: error.message,
            });
        } else {
            res.status(400).json({
                status: "Failed",
                error: error,
            });
        }
        return;
    } else {
        next();
    }
};

module.exports = errorHandler;