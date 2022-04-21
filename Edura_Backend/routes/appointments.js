var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var apptCollection = db.get("Appointments")
var tutorCollection = db.get("Tutor")

// Base URL - /appointment

/* GET All appointments */
router.get('/getAllAppointments', function (req, res, next) {
    apptCollection.find({}, function (err, appt) {
        if (err) throw err;
        res.json(appt)
    });
});

/* GET details of particular appointments*/
router.get('/getAllAppointments/:id', function (req, res, next) {
    apptCollection.find({ _id: req.params.id }, function (err, tutor) {
        console.log(">> tutor : ", tutor);
        if (err) throw err;
        res.json(tutor)
    });
});

/* Add new appointments */
router.post('/addNewAppointment', function (req, res) {
    apptCollection.insert({
        courseId: req.body.courseId,
        date: req.body.date,
        time: req.body.time,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        duration: req.body.duration,
        mode: req.body.mode,
        location: req.body.location,
        studentId: req.body.studentId,
        tutorId: req.body.tutorId,
        isAvailable: req.body.isAvailable

    }, function (err, appointment) {
        if (err) throw err;
        tutorCollection.find({ _id: req.body.tutorId }, function (errorT, tutor) {
            if (errorT) throw errorT;
            // console.log(appointment);
            tutor = tutor[0]
            let temp = tutor.availability.push(appointment._id)
            tutorCollection.update({ _id: req.body.tutorId },
                {
                    $set: {
                        ...tutor,
                        availability: tutor.availability
                    }
                },
                function (errU, tutorU) {
                    if (errU) throw errU;

                    res.json(tutorU)
                });

        })
    });
});

/* Updates appointments */
router.put('/updateAppointment/:id', function (req, res) {
    apptCollection.update({ _id: req.params.id },
        {
            $set: req.body
        },
        function (err, tutor) {
            if (err) throw err;
            res.json(tutor)
        });
});

/* Delete appointments */
router.delete('/deleteAppointment/:id', function (req, res) {
    apptCollection.remove({ _id: req.params.id }, function (err, tutor) {
        if (err) throw err;
        res.json(tutor)
    });
});

module.exports = router;