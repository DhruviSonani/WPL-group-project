var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var tutorCollection = db.get("Tutor")

// Base URL - /tutors

/* GET All tutors */
router.get('/getAllTutors', async function (req, res, next) {

    await tutorCollection.aggregate([
        {
            $lookup:
            {
                from: 'Courses',
                localField: 'courses',
                foreignField: '_id',
                as: 'courses'
            }
        }
        // ,
        // {
        //     $lookup:
        //     {
        //         from: 'Appointments',
        //         localField: 'availability',
        //         foreignField: '_id',
        //         as: 'availability'
        //     }
        // }
    ]).then(response => {
        res.json(response);
    })
});

/* GET details of particular tutor*/
router.get('/getAllTutors/:id', async function (req, res, next) {
    console.log(parseInt(req.params.id));
    await tutorCollection.find({ _id: req.params.id }, function (err, tutor) {
        if (err) throw err;
        res.json(tutor)
    });
});

/* Add new tutor */
router.post('/addNewTutor', function (req, res) {
    tutorCollection.insert({
        name: req.body.name,
        about: req.body.about,
        image: req.body.image,
        rating: req.body.rating,
        courses: req.body.courses,
        availability: req.body.availability,
        email: req.body.email
    }, function (err, tutor) {
        if (err) throw err;
        res.json(tutor)
    });
});

/* Updates tutor */
router.put('/updateTutor', function (req, res) {
    tutorCollection.update({ _id: req.body.id },
        {
            $set: req.body
        },
        function (err, tutor) {
            if (err) throw err;
            res.json(tutor)
        });
});

/* Delete tutor */
router.delete('/deleteTutor/:id', function (req, res) {
    tutorCollection.remove({ _id: parseInt(req.params.id) }, function (err, tutor) {
        if (err) throw err;
        res.json(tutor)
    });
});

module.exports = router;