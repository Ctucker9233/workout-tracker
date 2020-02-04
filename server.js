const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();
//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Workout = require("./models/workout");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//script to initially seed database

// const { Seeder } = require('mongo-seeding');

// const config = {
//   database: {
//     name: 'workout',
//   },
//   dropDatabase: true,
// };
// const seeder = new Seeder(config);
// const collections = seeder.readCollectionsFromPath(
//   path.resolve("\seeders"),
//   {
//     transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId],
//   },
// );

// seeder
//   .import(collections)
//   .then(() => {
//     console.log('Success');
//   })
//   .catch(err => {
//     console.log('Error', err);
//   });

// routes
app.use(require("./routes/routes.js"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/exercise?", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});