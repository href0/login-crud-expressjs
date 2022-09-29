import bcrypt from "bcrypt";
import Users from "../models/userModel.js";
import generateToken from "../helpers/generateToken.js";

const register = async (req, res) => {
  try {
    if (!req.body.username) {
      throw { code: 428, message: "Username is required" };
    }
    if (!req.body.name) {
      throw { code: 428, message: "Name is required" };
    }
    if (req.body.password !== req.body.retypePassword) {
      throw { code: 428, message: "Password do not match" };
    }

    const { username, name, password: passwordBody } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(passwordBody, salt);
    const create = await Users.create({
      username,
      name,
      password: passwordHash,
    });
    if (!create) {
      throw { code: 500, message: "USER_REGISTER_FAILED" };
    }

    const { password, provider, updatedAt, ...user } =
      create._previousDataValues;

    return res
      .status(201)
      .json({ status: true, message: "USER_REGISTER_SUCCESS", data: user });
  } catch (error) {
    res.status(error.code || "500").json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.username)
      throw { code: 428, message: "Username is required" };

    if (!req.body.password)
      throw { code: 428, message: "Password is required" };

    const { username, password: passwordBody } = req.body;
    const user = await Users.findOne({
      where: {
        username,
      },
    });
    if (!user) throw { code: 428, message: "Wrong username or password" };

    // check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) throw { code: 428, message: "Wrong username or passwords" };

    const { password, provider, refreshToken, updatedAt, isAdmin, ...other } =
      user._previousDataValues;
    const getToken = await generateToken(user.id, user.isAdmin);
    if (getToken) {
      res.cookie("refreshToken", getToken.refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 hari // gunakan secure : true untuk https
      });
    }
    return res.status(200).json({
      status: true,
      message: "LOGIN_SUCCESS",
      data: { user: other, accessToken: getToken.accessToken },
    });
  } catch (error) {
    res.status(error.code || "500").json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

export { login, register };
