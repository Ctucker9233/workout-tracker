const router = require("express").Router();
const Workout = require("../models/workout.js");

//add a new workout
router.post("/api/workouts", ({ body }, res) => {
    console.log(body)
    Workout.create(body)
        .then(dbWorkout => {
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//add the exercise to the current workout
router.put("/api/workouts/:id", (req, res) => {
    var exercise = req.body;
    Workout.findByIdAndUpdate(req.params.id, {
        $push: { exercises: exercise}
    }, {new: true})
        .then(function (dbWorkout) {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    console.log("Getting exercise info")
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    console.log("Getting exercise info")
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
