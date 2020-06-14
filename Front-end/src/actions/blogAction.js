import axios from "axios";
import { backEndLink } from "../config.js";

export const getBlog = async (placeId) => {
  const res = await axios.post(`${backEndLink}/api/blog/getblog`, { placeId });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot get Blog", res);
  }
};

export const createBlog = async (place, placeId, description, title, essay) => {
  const res = await axios.post(`${backEndLink}/api/blog/create`, {
    place,
    placeId,
    description,
    title,
    essay,
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot create Blog", res);
  }
};

export const submitFeedback = async (placeId, userFeedback) => {
  const res = await axios.post(`${backEndLink}/api/blog/submitfeedback`, { placeId, userFeedback });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot submit Feedback to Blog", res);
  }
};
