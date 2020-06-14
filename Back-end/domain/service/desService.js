var Destination = require("../models/destination");

const destinationService = {
  createDestination: async (region, city, description) => {
    const result = await Destination.findOne({ city : city });
    if (!result) {
      const newDestination = Destination({
        region,
        city,
        description,
      });
      await newDestination.save();
      return newDestination;
    } else {
      throw new Error("DESTINATION_EXISTED");
    }
  },
  getAll : async () => {
    let result = await Destination.find({});
    if (result) {
      return result;
    } else {
      throw new Error("error/Destination_not_found");
    }
  },
  deleteDestination: async (region, city) => {
      await Destination.deleteOne({ region, city})
  },
  updateDestination: async (region, city, description, id) => {
    let result = await Destination.findById(id);
    if (result) {
      result.region = region;
      result.city = city;
      result.description = description
      result.save();
      return result
    } else {
      throw new Error("error/Destination_not_found");
    }
  }
};

module.exports = destinationService;
