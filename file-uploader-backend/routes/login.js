const express = require("express");
const router = express.Router();
const passport = require("passport");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.find({
            where: {
                username: username
            }
        })
        done(null, user);
    } catch (err) {
        done(err);
    }
});

router.post("/", (req,res) => {
    const match = await bcrypt.compare(password, user.password);
if (!match) {
  // passwords do not match!
  return done(null, false, { message: "Incorrect password" })
}
})
module.exports = router;
