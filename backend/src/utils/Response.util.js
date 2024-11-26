const ApiResponse = (
  res,
  statusCode = 200,
  data,
  message = "Operation Executed..!"
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const ApiErrorResponse = (res, statusCode = 500, error, message = "An error occurred") => {
  // Default message and error handling
  const finalMessage = error instanceof Error ? error.message : message;
  const finalStatusCode = error instanceof Error ? error.statusCode || 500 : statusCode;

  res.status(finalStatusCode).json({
    success: false,
    message: finalMessage,
    error: error instanceof Error ? error.stack : undefined, // Send error stack trace if it's an instance of Error
  });
};

export { ApiResponse, ApiErrorResponse };
