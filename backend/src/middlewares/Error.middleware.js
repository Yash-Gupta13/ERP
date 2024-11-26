import { ApiErrorResponse } from "../utils/Response.util.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // console.log(`error message`, err.message)

  console.error(`[Error] ${err.stack}`);

  ApiErrorResponse(res, statusCode, err, message);
};

export default errorMiddleware;
