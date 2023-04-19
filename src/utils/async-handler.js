const asyncHandler = (requestHandler) => {
  const requestResult = async (req, res, next) => {
    try {
      await requestHandler(req, res);
    } catch (err) {
      next(err);
    }
  };

  return requestResult;
};

export default asyncHandler;
