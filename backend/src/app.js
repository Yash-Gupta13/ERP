import express from "express";
import userRouter from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/Error.middleware.js";
import cookieparser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cookieparser());

app.use("/api/v1/auth", userRouter);

app.use(errorMiddleware);

export default app;
