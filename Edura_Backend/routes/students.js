var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var collection = db.get("Students")

// Base URL - /students

/* GET All tutors */
router.get('/getAllStudents', function(req, res, next) {
    collection.find({}, function (err, students) {
        if (err) throw err;
        res.json(students)
    });
});

/* GET details of particular student*/
router.get('/getAllStudents/:id', function(req, res, next) {
      collection.find({ userId: String(req.params.id) }, function (err, student) {
        if (err) throw err;
        res.json(student)
    });
});

/* Add new tutor */
router.post('/addNewStudent', function (req, res) {    
    collection.insert({
        name: req.body.name,
        about : req.body.about,
        image: req.body.image,
        rating : req.body.rating,
        expertise: req.body.expertise,
        availability : req.body.availability       
    }, function (err, student) {
        if (err) throw err;
        res.json(student)
    });
});

/* Updates tutor */
router.post('/updateStudent', function (req, res) {    
    collection.update({ _id: req.body.id },
        {
            $set: {
                name: req.body.name,
                about : req.body.about,
                image: req.body.image,
                rating : req.body.rating,
                expertise: req.body.expertise,
                availability : req.body.availability       
            }
        },
        function (err, student) {
            if (err) throw err;
            res.json(student)
        });
});

/* Delete Student */
router.delete('/deleteStudent/:id', function (req, res) {
    collection.remove({ _id: req.params.id }, function (err, student) {
        if (err) throw err;
        res.json(student)
    });
});

module.exports = router;