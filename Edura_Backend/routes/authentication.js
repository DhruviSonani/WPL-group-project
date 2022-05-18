var express = require('express');
var router = express.Router();

var monk = require('monk')
var db = monk("localhost:27017/Edura")
var authCollection = db.get("Authentication")

// Base URL - /auth

// login
router.post('/login', function (req, res, next) {
    authCollection.find(
        {
            email: req.body.email,
            pwd: req.body.pwd
        },
        function (err, resp) {
            if (err) throw err;
            
            res.json(resp)
        });
});

router.put('/register/:email', function(req, res){
    authCollection.find({
        email: req.params.email
    },
    function(err, resp){
        if(err) throw err;
        if(resp.length != 0){
            authCollection.update({_id: resp[0]._id},{
                $set : req.body
            },
            function(erroeS, respS){
                if(erroeS) throw erroeS;
                res.json(resp)
            }
            )
             
        }
        else{
            res.json([])
        }
    })
})
module.exports = router