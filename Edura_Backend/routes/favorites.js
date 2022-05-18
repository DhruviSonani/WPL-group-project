var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var favoritesCollection = db.get("Favorites")
var studentCollection = db.get("Students")

// Base URL - /favorite

// Add fav tutor
router.post('/addFavorite', function (req, res) {
    favoritesCollection.insert({
        tutorId: req.body.tutorId,
        studentId: req.body.studentId
    }, function (err, appt) {
        if (err) throw err;
        res.json(appt)
    });
});

// remove from fav professor
router.delete('/removeFavorite/:id', function (req, res) {
    favoritesCollection.remove({ _id: req.params.id }, function (err, removedFav) {
        if (err) throw err;
        res.json(removedFav)
    });
})

// get list of fav professors for a single student
router.post('/getFavorites', async function (req, res) {
    await studentCollection.aggregate([
        {
            $lookup: {
                from: 'Favorites',
                localField: 'userId',
                foreignField: 'studentId',
                as: 'favorites'

            }
        },
        {
            $unwind: {
                path: '$favorites'
            }
        },
        {
            $lookup: {
                from: 'Tutor',
                localField: 'favorites.tutorId',
                foreignField: 'userId',
                as: 'Tutor'
            }
        }
    ]).then(resp => {
        const temp = resp.filter(item => {
            return item.userId == req.body.id
        })
        res.json(temp)
    })
})

module.exports = router