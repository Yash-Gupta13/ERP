const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)) // Ensures the request handler is resolved as a promise
        .catch(next); // Passes any errors to the next middleware (error handler)
    };
  };
    

export {
    asyncHandler
}