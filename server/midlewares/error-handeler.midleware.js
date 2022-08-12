const errorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    return res.status(404).json({
      status: false,
      errors: {
        message: err.message,
      },
    });
  }

  if (err.status == 400) {
    return res.status(400).json({
      status: false,
      errors: {
        message: "Bad request",
      },
    });
  }

  if (err.status == 401) {
    return res.status(401).json({
      status: false,
      errors: {
        message: "You have no permission.",
      },
    });
  }

  return res.status(500).json({
    status: false,
    errors: {
      message: "Internal server error.",
    },
  });
};

module.exports = errorHandler;
