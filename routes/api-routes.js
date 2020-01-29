const router = require("express").Router();
const Workout = require("../models/workout.js");
var path = require("path");

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  router.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });

  router.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
            res.redirect(path.join(__dirname, "../public/index.html"))
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
    .then(dbWorkout =>{
        res.json(dbWorkout)
    })
    .catch(err => {
        res.status(400).json(err);
      });
});

router.put("/api/workouts/:id", (req, res) =>{
    Workout.update(req.body, {
        where: {
            _id: req.params.id
        }
    })
    .then(function(dbWorkout) {
        res.json(dbWorkout);
      });
});

module.exports = router;