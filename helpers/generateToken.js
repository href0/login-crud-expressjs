import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const generateToken = async (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_LIFE }
  );

  // generate refreshToken
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_LIFE }
  );

  // update refreshToken
  await Users.update(
    { refreshToken: refreshToken },
    {
      where: { id: userId },
    }
  );

  return { accessToken, refreshToken };
};

export default generateToken;
