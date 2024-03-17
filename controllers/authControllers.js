import jwt from "jsonwebtoken";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as authServices from "../services/authServices.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const user = await authServices.findUser({ email: req.body.email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const { email, subscription } = await authServices.signup(req.body);
  res.status(201).json({ user: { email, subscription } });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await authServices.validatePassword(
    password,
    user.password
  );
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id } = user;
  const payload = { id: _id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "20H" });

  const result = await authServices.updateUser({ _id }, { token });

  res.json({
    token,
    user: { email: result.email, subscription: result.subscription },
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: null });

  res.status(204).send();
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const { email, subscription } = await authServices.updateUser(
    { _id },
    req.body
  );

  res.json({ user: { email, subscription } });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
