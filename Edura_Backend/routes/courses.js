var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var collection = db.get("Courses")

// Base URL - /courses

// get all courses
router.get('/getAllCourses', function (req, res, next) {
    collection.find({}, function (err, courses) {
        if (err) throw err;
        res.json(courses)
    });
});

module.exports = router