const router = require('express').Router();
//  const Workout = require('../models/workout.js');
const db = require("../models");
router.get('/workouts', (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
})

router.post('/workouts', (req, res)=> {
    //code
});

router.put('/workout/:id', ({ body, params}, res) => {
//Your code here
});

router.get('/workouts/range', (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
})

module.exports = router;