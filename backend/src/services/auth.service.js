import { prisma } from "../config/prismaHandler.js";
import ApiError from "../utils/ErrorHandler.util.js";
import bcrypt from "bcryptjs";
import { generateAccessAndRefreshToken } from "../utils/Jwt.util.js";

const registerUser = async (userName, email, password) => {
  try {
    if (!userName || !email || !password) {
      throw new ApiError("All Fields are mandatory", 401);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError("Email already Exist", 400);
    }

    // console.log(`existedUser below`)

    const saltRound = 10;

    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    console.error(`Error in registerUser: ${error.message}`,error);
    throw new ApiError(error.message || "Internal Server Error", 500);
  }
};

const loginUser = async (email, password) => {
  try {
    if (!email || !password) {
      throw new ApiError(`Fields are mandatory`, 400);
    }

    const userDetail = await prisma.user.findUnique({
      where: { email },
    });

    if (!userDetail) {
      throw new ApiError(`Email doesn't exist. Please Signup`, 400);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetail.password
    );

    if (!isPasswordCorrect) {
      throw new ApiError(`Invalid Credentials`, 401);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      userDetail.id
    );

    const loginUserDetails = await prisma.user.findUnique({
      where: {
        id: userDetail.id,
      },
      select: {
        id: true,
        userName: true,
        email: true,
      },
    });

    return { loginUserDetails, accessToken, refreshToken };
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw new ApiError(error.message || "Internal Server Error", 500);
  }
};

const logoutUser = async (user) => {
  try {
    const { id } = user;

    const userDetail = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userDetail) {
      throw new ApiError(`User Does not exist`, 401);
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: null,
      },
    });

    return { message: "Logged out successfully" };
  } catch (error) {
    console.error("Error during logout:", error);
    throw new ApiError("An error occurred during logout", 500);
  }
};

export { registerUser, loginUser, logoutUser };
