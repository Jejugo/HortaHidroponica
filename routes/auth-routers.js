const router = require('express').Router();

router.get('/register', function(req, res){
    res.render("register", {});
});

router.get('/logout', function(req, res){
    res.json("Logging out!");
});

router.get('/google', function(req, res){
    res.send("Logging with Google");
});

module.exports = router
