const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

// load controller

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await prisma.user.find({
            where: {
                username: username
            }
        })
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );





// create account
router.post("/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
            const newAccount = await prisma.account.create({
                data: {
                    username: req.body.username,
                    password: hashedPassword,
                }
            })
            res.send('Profile created successfully');
        } catch (err) {
            return next(err);
        };
    })
});

// read account
router.get("/", (req,res) => res.send("Hello account get"));

// update account
router.put("/", (req,res) => res.send("Hello account update"));

// delete account
router.delete("/", (req,res) => res.send("Hello account delete"));


module.exports = router;