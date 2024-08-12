const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const passport = require("passport");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



router.post("/", passport.authenticate("local"), (req, res) => {
    console.log('Authenticated User:', req.user);
    if (!req.user) {
        return res.status(401).json({ message: "Authentication failed" });
    }

    return res.status(200).json({ message: "Authentication successful" });
});


module.exports = router;
