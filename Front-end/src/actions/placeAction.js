import axios from "axios";
import {backEndLink } from "../config.js"


export const getDestination = async () => {
   const res = await axios.get(`${backEndLink}/api/destination/all`);
   if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Cannot get destination", res);
    }
};

export const addDestination = async (region, city, description) => {
   const res = await axios.post(`${backEndLink}/api/destination/add`, { region, city, description});
   if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Cannot add destination", res);
    }
};

export const delDestination = async (region, city) => {
  let res = await axios.post(`${backEndLink}/api/destination/delete`, { region, city});
  // let res = await axios.post(`${backEndLink}/api/places/deleteall`, { region, city});
  if (res.status === 200) {
    res = await axios.post(`${backEndLink}/api/places/deleteall`, { region, city});
    if(res.status === 200){
      return res.data;
    }
   } else {
     throw new Error("Cannot delete destination", res);
   }
};

export const delPlace = async (region, city, name) => {
  const res = await axios.post(`${backEndLink}/api/places/delete`, { region, city, name});
  if (res.status === 200) {
     return res.data;
   } else {
     throw new Error("Cannot delete place", res);
   }
};

export const getPlacesOfADestination = async (city) => {
  const res = await axios.post(`${backEndLink}/api/places`, {city});
  if (res.status === 200) {
     return res.data;
   } else {
     throw new Error("Cannot get places", res);
   }
};

export const addPlace = async (region, city , name, description) => {
  // console.log(region, city , name, description)
  const res = await axios.post(`${backEndLink}/api/places/add`, { region, city,name, description});
  if (res.status === 200) {
     return res.data;
   } else {
     throw new Error("Cannot add place", res);
   }
};

export const updateDestination = async (region, city, description, id) => {
  const res = await axios.post(`${backEndLink}/api/destination/update`, { region, city, description, id});
  if (res.status === 200) {
     return res.data;
   } else {
     throw new Error("Cannot update destination", res);
   }
};

export const updatePlace = async (region, name, description, id) => {
  const res = await axios.post(`${backEndLink}/api/places/update`, { region, name, description, id});
  if (res.status === 200) {
     return res.data;
   } else {
     throw new Error("Cannot update destination", res);
   }
};