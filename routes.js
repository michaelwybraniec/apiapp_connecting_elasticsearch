// import express from 'express';
var express = require('express');
var router = express.Router();

var workouts = [
    {
        id: 1,
        type: 'Jogging',
        duration: 150,
        date: "04-03-2019"
    },
    {
        id: 2,
        type: 'Cycling',
        duration: 50,
        date: "04-03-2019"
    }
];

router.use((req, res, next) => {
    // You can do some analytics here - "middleware" ?
    console.log(req.method, req.url);
    // Do next to call next otherwise it will stop at the first route
    next()

})


//!______________________________________________GET all workouts
router.get('/workouts', (req, res) => {
    return res.status(200).send({
        message: 'GET workouts call succeeded',
        workouts: workouts
    });
})

//!______________________________________________GET specyfic workouts by id
router.get('/workouts/:id', (req, res) => {
    let workout = workouts.find(workout => workout.id == req.params.id);

    if (!workout) {
        return res.status(400).send({
            message: `Workaout is not found for id ${req.params.id}`
        });
    } else {
        return res.status(200).send({
            message: `GET workout call for id ${req.params.id} succeeded`,
            workout: workout
        });
    };
});

//!______________________________________________POST workout
router.post('/workout', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send({
            message: `Id is required`
        });
    } else {
        workouts.push(req.body);
        return res.status(200).send({
            message: `POST workout call succeeded`
        });
    };
});

//!______________________________________________PUT workout
router.put('/workout', (req, res) => {
console.log('req.body :', req.body);
    if (!req.body.id) {
        return res.status(400).send({
            message: `Id is required`
        });

    } else {
        var foundIndex = workouts.findIndex(w => w.id == req.body.id);
        workouts[foundIndex] = req.body;
        return res.status(200).send({
            message: `PUT workout call for id ${req.body.id}! succeeded`
        });
    };

});

//!______________________________________________DELETE specyfic workout by Id
router.delete('/workout/:id', (req, res) => {
    var foundIndex = workouts.findIndex(d => d.id === req.params.id);
    workouts.splice(foundIndex, 1);

    return res.status(200).send({
        message: `DELETE workout call for id ${req.params.id}! succeeded`
    });

});

module.exports = router;
