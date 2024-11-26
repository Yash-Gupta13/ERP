import { config } from "dotenv";
import app from "./app.js";
import { connectDBWithRetry, disconnectDB } from "./config/prismaHandler.js";

config();

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDBWithRetry();

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
})();

process.on("SIGINT", disconnectDB);
process.on("SIGTERM", disconnectDB);
