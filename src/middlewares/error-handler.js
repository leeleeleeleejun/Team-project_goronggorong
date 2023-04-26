// 새로만든 errorHandler
class customError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    result: 'error',
    message,
    statusCode,
  });
};

export { customError, errorHandler };
