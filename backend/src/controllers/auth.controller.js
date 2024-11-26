import {
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/Response.util.js";

const register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  const user = await registerUser(userName, email, password);

  return ApiResponse(res, 200, user, `User Created Successfully`);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  res
    .cookie("accessToken", user.accessToken, {
      httpOnly: true,
      secure: true,
    })
    .cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: true,
    });

  return ApiResponse(res, 200, user.loginUserDetails, "Successfully login");
});

const logout = asyncHandler(async (req, res) => {
  
  const user = await logoutUser(req.user);

  res.clearCookie("accessToken").clearCookie("refreshToken");

  return ApiResponse(res, 200, null, "Logout Successfully");
});

export { register, login, logout };
