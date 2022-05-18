var texpress = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var feedbackCollection = db.get("Feedback")

// Base URL - /feedback

// Add feedback
router.post('/addFeedback/', function (req, res) {
    feedbackCollection.insert(
        {
            "tutorId": req.body.tutorId,
            "studentId": req.body.studentId,
            "rate": req.body.rate,
            "desc": req.body.desc
        },
        function (err, tutor) {
            if (err) throw err;
            res.json(tutor)
        });

})
module.exports = router