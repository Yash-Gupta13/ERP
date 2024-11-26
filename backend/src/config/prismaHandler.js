import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MAX_RETRIES = 5;

async function connectDBWithRetry(retries = 0) {
  try {
    await prisma.$connect();
    console.error(`DB Connected Successfully....!😊`);
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.error(
        `Connection failed. Retrying (${retries + 1}/${MAX_RETRIES})...😒`
      );
      await new Promise((res) => setTimeout(res, 2000));
      return connectDBWithRetry(retries + 1);
    } else {
      console.error("Max retries reached. Exiting...😫");
      process.exit(1);
    }
  }
}

async function disconnectDB() {
  console.log("Closing DB connection...😴");
  await prisma.$disconnect();
  process.exit(0);
}

export { prisma, connectDBWithRetry, disconnectDB };
