const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.send({ message: "Logged Out" });  
    });
});

module.exports = router;