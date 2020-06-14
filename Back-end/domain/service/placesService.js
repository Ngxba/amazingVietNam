var Places = require("../models/places");

const PlacesService = {
  createPlaces: async (region, city, name, description) => {
    const result = await Places.findOne({ name: name, city: city });
    if (!result) {
      const newPlace = Places({
        region,
        city,
        name,
        description,
      });
      await newPlace.save();
      return newPlace;
    } else {
      throw new Error("PLACES_EXISTED");
    }
  },
  getPlaces: async (city) => {
    let result = await Places.find({ city });
    if (result) {
      return result;
    } else {
      throw new Error("error/Place_not_found");
    }
  },
  deletePlace: async (region, city, name) => {
    await Places.deleteOne({ region, city, name });
  },
  deleteAllPlace: async (region, cityName) => {
    const city = cityName.replace(/\s/g, "").toUpperCase();
    await Places.deleteMany({ region, city });
  },
  updatePlace: async (region, name, description, id) => {
    let result = await Places.findById(id);
    if (result) {
      result.region = region;
      result.name = name;
      result.description = description
      result.save();
      return result
    } else {
      throw new Error("error/Place_not_found");
    }
  }
};

module.exports = PlacesService;
