const router = require('express').Router();
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

const authCheck = (req, res, next) => {
    if(req.user != null){
        next();
    }
    else{
        res.redirect('/home');
    }
};

router.get("/", authCheck, function(req, res){
    res.render('profile', {user: req.user, msg: ''});
});



module.exports = router;