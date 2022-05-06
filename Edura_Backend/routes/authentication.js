var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var collection = db.get("Authentication")

// Base URL - /auth

// login
router.post('/login', function (req, res, next) {
    collection.find(
        {
            email: req.body.email,
            pwd: req.body.pwd
        }
        , function (err, resp) {
            if (err) throw err;
            res.json(resp)
        });
});

module.exports = router