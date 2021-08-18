const router = require('express').Router();
const Workout = require('../models/workout.js');

// router.get('/workouts', (req, res) => {
//     Workout.find({})
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// })
router.get('/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
router.post('/workouts', (req, res)=> {
  Workout.create(req.body)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

router.put('/workouts/:id', ({body, params}, res) => {
//Your code here
Workout.updateOne({_id:params.id},{ $push: { exercises: body }} )
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// router.get('/workouts/range', (req, res) => {
//     limit(7)
//     Workout.find({})
//     .then(dbWorkout => {
//         console.log(dbWorkout);
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// })

router.get('/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;