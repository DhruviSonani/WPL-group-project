var express = require('express');
var router = express.Router();
const { cloudinary } = require("../utils/cloudinary")

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var tutorCollection = db.get("Tutor")
var feedbackCollection = db.get('Feedback')
var authCollection = db.get("Authentication")

const upload = require('../middleware/upload');
const { ObjectId } = require('mongoose/node_modules/mongodb');


// Base URL - /tutors

/* GET All tutors */
router.get('/getAllTutors', async function (req, res, next) {
    await tutorCollection.aggregate([
        {
            $lookup:
            {
                from: 'Courses',
                localField: 'courses',
                foreignField: 'value',
                as: 'courses'
            },
        },
        {
            $lookup: {
                from: 'Appointments',
                localField: 'availability',
                foreignField: '_id',
                as: 'availability'
            } 
        },
        {
            $lookup: {
                from: 'Favorites',
                localField: 'userId',
                foreignField: 'tutorId',
                as: 'favorites'
            }
        },
        {
            $lookup: {
                from: 'Feedback',
                localField: 'userId',
                foreignField: 'tutorId',
                as: 'feedBack'
            }
        }
    ]).then(response => {
        res.json(response);
    })
});

/* GET details of particular tutor*/
router.get('/getAllTutors/:id', async function (req, res, next) {
    // _id : req.params.id
    await tutorCollection.find({ userId: req.params.id }, function (err, tutor) {
        if (err) throw err;
        res.json(tutor)
    });
});

/* Add new tutor */
router.post('/addNewTutor', function (req, res) {
    authCollection.insert({
        email: req.body.email,
        role:1
    }, function(errL, respL){
        if (errL) throw errL;
        // res.json(respL)
        tutorCollection.insert({
            userId : String(respL._id),
            fname: req.body.fname,
            lname: req.body.lname,
            name: req.body.name,
            about: req.body.about,
            courses: req.body.courses,
            image: req.body.image,
            email: req.body.email
        }, function (err, tutor) {
            if (err) throw err;
            res.status(201)
            res.json(tutor)
        });
    })
    
});

/* Updates tutor */
router.put('/updateTutor', function (req, res) {
    tutorCollection.update({ _id: req.body._id },
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
    tutorCollection.remove({ _id: req.params.id }, function (err, tutor) {
        if (err) throw err;
        res.status(200)
        res.json(tutor)
    });
});

// Upload tutor Image
router.post('/upload', async function (req, res) {
    try {
        const fileStr = req.body.data
        // console.log("\n\n\n\non server : ",fileStr);
        const uploadedResp = await cloudinary.uploader.upload(fileStr,
            {
                upload_preset: 'dev_setups'
            })
        console.log(uploadedResp);
        res.json({ msg: "Uploaded", resp: uploadedResp })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong!' })
    }
})

// return total and avg tutoring hours
router.post('/getTutoringData', async function (req, res) {
    console.log(">>> req : ", typeof (req.body.id));
    await feedbackCollection.find({ tutorId: req.body.id }, function (err, rate) {
        if (err) throw err;

        const avgRating = rate.reduce(
            (previousValue, currentValue) => previousValue + currentValue.rate,
            0
        ) / rate.length;

        res.json([{
            "avgRating" : avgRating
        }])
    });
})
module.exports = router;