const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");


router.post('/', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            
            return res.status(400).json({
                message: info ? info.message : 'Something is not right',
                user: user
            });
        }

        const token = jwt.sign(user, process.env.SECRET, { expiresIn: "2h"});
        return res.json({ token });
    })(req, res);
});


module.exports = router;
