const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
var path = require("path");

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../workout-tracker/public/index.html"));
});

app.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../workout-tracker/public/exercise.html"));
});

app.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../workout-tracker/public/stats.html"));
});

app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.put("/api/workouts/:id", (req, res) => {
    db.Workout.update(req.body, {
        where: {
            _id: req.params.id
        }
    })
        .then(function (dbWorkout) {
            res.json(dbWorkout);
        });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});