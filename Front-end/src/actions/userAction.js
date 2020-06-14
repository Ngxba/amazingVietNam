import axios from "axios";
import { backEndLink } from "../config.js";

export const signIn = async (email, password) => {
  const res = await axios.post(`${backEndLink}/api/user/signin`, {
    email,
    password,
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot sign in", res);
  }
};

export const signUp = async (name, email, password) => {
  const res = await axios.post(`${backEndLink}/api/user/signup`, {
    name,
    email,
    password,
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot sign up", res);
  }
};

export const updateData = async (name, email) => {
  const res = await axios.post(`${backEndLink}/api/user/update`, {
    name,
    email,
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot Update", res);
  }
};
