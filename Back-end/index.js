require("dotenv").config();
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var morgan = require("morgan");
// var router = require("./application/router/index.js") // mac dinh no se tro? toi index.js
const app = express();
var destinationService = require("./domain/service/desService.js");
var placesService = require("./domain/service/placesService");
var userService = require("./domain/service/userService");
var BlogService = require("./domain/service/blogService");

app.use(cors());

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    hello: "world",
  });
});

app.get("/api/destination/all", async (req, res) => {
  try {
    const allDest = await destinationService.getAll();
    res.json(allDest);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/destination/add", async (req, res) => {
  const { region, city, description } = req.body;
  try {
    const newDes = await destinationService.createDestination(
      region,
      city,
      description
    );
    res.json(newDes);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/destination/delete", async (req, res) => {
  const { region, city } = req.body;
  try {
    await destinationService.deleteDestination(region, city);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/destination/update", async (req, res) => {
  const { region, city, description, id } = req.body;
  try {
    await destinationService.updateDestination(region, city, description,id);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/places", async (req, res) => {
  const city = req.body.city;
  try {
    const places = await placesService.getPlaces(city);
    res.json(places);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/places/add", async (req, res) => {
  const { region, city, name, description } = req.body;
  try {
    const newPlace = await placesService.createPlaces(
      region,
      city,
      name,
      description
    );
    res.json(newPlace);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/places/delete", async (req, res) => {
  const { region, city, name } = req.body;
  try {
    await placesService.deletePlace(region, city, name);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/places/deleteall", async (req, res) => {
  const { region, city } = req.body;
  try {
    await placesService.deleteAllPlace(region,city);
    res.json({
      success: true
    });
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/places/update", async (req, res) => {
  const { region, name, description, id } = req.body;
  console.log(region, name, description, id)
  try {
    await placesService.updatePlace(region, name, description,id);
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/user/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await userService.signUp(name, email, password);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/user/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const fecthedUser = await userService.signIn(email, password);
    res.json(fecthedUser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/user/update", async (req, res) => {
  const {name, email } = req.body;
  try {
    const updatedUsser = await userService.editUser(name, email);
    res.json(updatedUsser);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/blog/create", async (req, res) => {
  const {place, placeId, description, title, essay} = req.body;
  try {
    const newBlog = await BlogService.createBlog(place, placeId, description, title, essay);
    res.json(newBlog);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

app.post("/api/blog/getblog", async (req, res) => {
  const {placeId} = req.body;
  try {
    const blog = await BlogService.getBlog(placeId)
    res.json(blog);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});



app.post("/api/blog/submitfeedback", async (req, res) => {
  const {placeId, userFeedback} = req.body;
  try {
    const blog = await BlogService.submitFeedback(placeId, userFeedback);
    res.json(blog);
  } catch (err) {
    res.status(400);
    res.json({
      err: err.message,
    });
  }
});

// const PORT = process.env.PORT;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
