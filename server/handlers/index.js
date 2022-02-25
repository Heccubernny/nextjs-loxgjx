// 404 error
module.exports.notFoundHandler = (err, res, req, next) => {
  res.status(err.status || 404).json({
    err: err.message || 'page not found 404',
  });
};

// 500 error
module.exports.errorHandler = (err, res, req, next) => {
  res.status(err.status || 500).json({
    err: err.message || 'Server Error 500',
  });
};
